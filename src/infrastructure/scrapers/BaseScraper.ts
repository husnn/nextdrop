import { ScraperState } from "@core/entities/ScraperState";

export default abstract class BaseScraper {
  status: ScraperState

  constructor() {
    this.status = ScraperState.Started;
  }

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