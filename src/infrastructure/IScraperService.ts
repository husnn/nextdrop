import IBot from '@core/entities/interfaces/IBot';
import IScraper from './scrapers/IScraper';
import ScraperStatus from './scrapers/ScraperStatus';

export default interface IScraperService {
  scrapers: IScraper[];
  createScraper(bot: IBot): IScraper | undefined;
  run(scraper: IScraper): void;
  onStatusUpdated(id: string, status: ScraperStatus): void;
  stop(id: string): Promise<void>;
  onError(id: string, error: Error): void;
}