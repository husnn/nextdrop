import { EventEmitter } from 'events';
import moment from 'moment';
import schedule from 'node-schedule';

import Bot from '@core/entities/Bot';
import IScraperService from '@infrastructure/IScraperService';
import CurrysScraper from '@infrastructure/scrapers/CurrysScraper';
import IScraper from '@infrastructure/scrapers/IScraper';
import ScraperStatus from '@infrastructure/scrapers/ScraperStatus';

export default class ScraperService extends EventEmitter implements IScraperService {
  scrapers: IScraper[] = [];
  startDate?: any;
  
  createScraper(bot: Bot): IScraper | undefined {
    const scraper = ScraperFactory.create(bot, this);
    if (!scraper) return;

    this.startDate = bot.startDate;

    this.scrapers.push(scraper);

    return scraper;
  }
  
  run(scraper: IScraper) {
    const momentDate = moment(this.startDate);
    if (momentDate && momentDate.isAfter()) {
      this.onStatusUpdated(scraper.id, ScraperStatus.Scheduled);

      schedule.scheduleJob(momentDate.toDate(), () => {
        this.run(scraper);
      });

      return;
    }
    
    scraper.run();
  }

  onStatusUpdated(id: string, status: ScraperStatus): void {
    this.emit('statusUpdate', { id, status });
  }

  getScraperById(id: string): IScraper | undefined {
    return this.scrapers.find((scraper: IScraper) => scraper.id === id)
  }
  
  async stop(id: string): Promise<void> {
    const scraper = this.getScraperById(id);
    this.destroy(id);
    await scraper?.stop();
  }

  onError(id: string, error: Error): void {
    console.log(error);
    if (!this.getScraperById(id)) return;
    this.onStatusUpdated(id, ScraperStatus.Error);
  }

  private async destroy(id: string): Promise<void> {
    this.scrapers.forEach( (scraper: IScraper, index: number) => {
      if (scraper.id === id) this.scrapers.splice(index, 1);
    });
  }
}

export class ScraperFactory {
  static create = (bot: Bot, scraperService: IScraperService): IScraper | null => {
    let scraper = null;

    switch (bot.retailer.id) {
      case 'currys':
        scraper = new CurrysScraper(bot, scraperService);
    }

    return scraper;
  }
}