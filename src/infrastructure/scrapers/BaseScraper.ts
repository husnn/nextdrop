import os from 'os';
import puppeteer, { Browser, Page } from 'puppeteer';

import Bot from "@core/entities/Bot";
import ScraperStatus from "@infrastructure/scrapers/ScraperStatus";
import IScraperService from '@infrastructure/IScraperService';
import IScraper from './IScraper';

export default abstract class BaseScraper implements IScraper {
  id: string;
  browser?: Browser;
  page?: Page;
  bot: Bot;
  scraperService: IScraperService;
  
  status: ScraperStatus = ScraperStatus.Offline;
  timeout: number = 5;
  cookieConsentButtonSelector?: string;
  inStock: boolean = false;
  defaultCheckStockInterval: number = 15;
  typingSpeed: number = 100

  constructor(bot: Bot, scraperService: IScraperService) {
    this.id = `${bot.retailer.id}-${Math.floor(Math.random() * 100)}`;
    this.bot = bot;
    this.scraperService = scraperService;
  }
  
  setStatus(status: ScraperStatus) {
    this.status = status;
    this.scraperService.onStatusUpdated(this.id, status);
  }
  
  async handleError(error: Error): Promise<void> {
    this.scraperService.onError(this.id, error);
  }
  
  async stop(): Promise<void> {
    await this.browser?.close();
  }

  async run(): Promise<void> {
    this.setStatus(ScraperStatus.Running);

    try {
      let chromePath =
        os.platform() === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      
      this.browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        slowMo: 15,
        defaultViewport: null
      });
      
      const context = await this.browser.createIncognitoBrowserContext();
      this.page = await context.newPage();
      
      this.page.setDefaultTimeout(this.timeout * 60 * 1000);

      await this.page.goto(this.bot.retailer.homeUrl, {
        waitUntil: "networkidle0",
      });

      if (this.cookieConsentButtonSelector) {
        await this.waitAndClick(this.cookieConsentButtonSelector);
        await this.wait(2);
      }

      await this.init();
      await this.selectProxy();
      await this.harvestCookies();
      await this.verifyAvailability();
      await this.addToCart();
      await this.beginCheckout();
      await this.enterShippingDetails();
      await this.enterBillingDetails();
      await this.proceedToPayment();
      await this.enterPaymentDetails();
      await this.placeOrder();
      await this.confirmOrder();
    } catch (err) {
      this.handleError(err);
    }
  }

  async verifyAvailability(): Promise<void> {
    while (!this.inStock) {
      await this.checkStock();

      if (!this.inStock) {
        this.setStatus(ScraperStatus.AwaitingStock);
        console.log(`Out of stock. Checking again in ${this.bot.checkStockInterval} minutes.`);
        await this.wait(
          this.bot.checkStockInterval
            ? this.bot.checkStockInterval
            : this.defaultCheckStockInterval,
          true
        );
      }
    }
  }

  wait(seconds: number, minutes: boolean = false): Promise<void> {
    let factor = 1000;
    if (minutes) factor *= 60;

    return new Promise((resolve) =>
      setTimeout(() => resolve(), seconds * factor)
    );
  }

  async waitAndClick(selector: string) {
    await this.page?.waitForSelector(selector);
    await this.page?.click(selector);
  }

  abstract init(): Promise<void>;
  abstract selectProxy(): Promise<void>;
  abstract harvestCookies(): Promise<void>;
  abstract checkStock(): Promise<void>;
  abstract addToCart(): Promise<void>;
  abstract beginCheckout(): Promise<void>;
  abstract enterShippingDetails(): Promise<void>;
  abstract enterBillingDetails(): Promise<void>;
  abstract proceedToPayment(): Promise<void>;
  abstract enterPaymentDetails(): Promise<void>;
  abstract placeOrder(): Promise<void>;
  abstract confirmOrder(): Promise<void>;
}
