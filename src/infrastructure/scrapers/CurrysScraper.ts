import ScraperStatus from "@infrastructure/scrapers/ScraperStatus";
import BaseScraper from "./BaseScraper";

export default class CurrysScraper extends BaseScraper {
  cookieConsentButtonSelector = "#onetrust-accept-btn-handler";

  async init(): Promise<void> {
    this.setStatus(ScraperStatus.Running);
  }

  async selectProxy(): Promise<void> {
    this.setStatus(ScraperStatus.SelectingProxy);
  }

  async harvestCookies(): Promise<void> {
    this.setStatus(ScraperStatus.HarvestingCookies);
  }

  async checkStock(): Promise<void> {
    this.setStatus(ScraperStatus.CheckingStock);

    await this.page?.goto(this.bot.productUrl, { waitUntil: "networkidle2" });

    const elements = await this.page?.$$('script[type="application/ld+json"]');

    for await (const element of elements!) {
      const text = await this.page?.evaluate(
        (element: any) => element.innerText,
        element
      );
      const json = JSON.parse(text);

      if (json["@type"] && json["@type"] == "Product") {
        this.inStock =
          json["offers"]["availability"] == "http://schema.org/InStock";
      }
    }
  }

  async addToCart(): Promise<void> {
    this.setStatus(ScraperStatus.AddingToCart);

    await this.waitAndClick('[data-component="add-to-basket-button-wrapper"]');

    const response = await this.page?.waitForResponse(
      (response: any) =>
        response.url() === "https://www.currys.co.uk/api/cart/addProduct" &&
        response.status() === 200
    );

    const responseJson: any = await response?.json();

    await this.page?.goto(responseJson!["redirectUrl"], {
      waitUntil: "networkidle0",
    });

    await this.page?.goto("https://www.currys.co.uk/app/basket", {
      waitUntil: "networkidle0",
    });
  }

  async beginCheckout(): Promise<void> {
    this.setStatus(ScraperStatus.BeginningCheckout);

    await this.waitAndClick('[data-component="BasketFooterCTA"]');
    await this.wait(1);

    await this.page?.waitForSelector(
      '#delivery_location > [aria-label="Postcode Checker"]'
    );

    await this.page?.type(
      '#delivery_location > [aria-label="Postcode Checker"]',
      this.bot.profile.address.postCode,
      { delay: 200 }
    );

    await this.waitAndClick(
      '#delivery_location > [aria-label="Submit Search"]'
    );

    await this.page?.waitForResponse(
      (response: any) =>
        response.url().endsWith("/deliveryLocation") &&
        response.status() === 200
    );

    await this.wait(1);

    if (await this.page?.$('[data-component="DeliverySlotStandard"]')) {
      await this.waitAndClick(
        '[data-component="DeliverySlotStandard"] > [data-element="DeliverySlotBlock"] > button'
      );
    } else if (
      await this.page?.$('[data-component="DeliverySlotDatesWithSlots"]')
    ) {
      await this.page?.waitForSelector(
        '[data-component="DeliverySlotTable"]'
      );

      // TODO: FIX - Doesnt' work
      const cells = await this.page?.$$('[data-component="DeliverySlotTable"] > [data-element="DayColumn"]');
      console.log(cells);
      
      const btn = await cells[0].$('[data-element="DeliverySlotCell"] > button');
      btn.click();
    }

    await this.page?.waitForResponse(
      (response: any) =>
        response.url().endsWith("/deliverySlot") &&
        response.status() === 200
    );

    await this.wait(1);

    await this.page?.waitForSelector('[data-component="EnterEmail"]');

    await this.page?.type('[name="email"]', this.bot.profile.emailAddress, {
      delay: this.typingSpeed
    });

    await this.wait(1);

    await this.waitAndClick('[data-component="EnterEmail"] button');

    await this.page?.waitForResponse((response: any) =>
      response.url().endsWith("/token")
    );

    await this.wait(1);

    const continueAsGuestBtnSelector = '[data-element="ContinueAsGuest"] span';

    if (await this.page?.$(continueAsGuestBtnSelector))
      this.waitAndClick(continueAsGuestBtnSelector);

    await this.wait(1);
  }

  async enterShippingDetails(): Promise<void> {
    this.setStatus(ScraperStatus.EnteringShippingDetails);

    await this.page?.waitForSelector('[data-type="deliveryAddress"]');

    await this.waitAndClick('[data-component="TitleSelectBox"] > div');

    await this.waitAndClick(
      '[data-component="TitleSelectBox"] [data-qa="d-title_mr"]'
    );

    await this.page?.type('[name="fname"]', this.bot.profile.firstName, {
      delay: this.typingSpeed,
    });

    await this.page?.type('[name="lname"]', this.bot.profile.lastName, {
      delay: this.typingSpeed,
    });

    await this.page?.type(
      '[name="country-code phone"]',
      this.bot.profile.phoneNumber,
      { delay: this.typingSpeed }
    );

    await this.page?.type('[name="address"]', this.bot.profile.address.line, {
      delay: this.typingSpeed,
    });

    await this.page?.type('[name="city"]', this.bot.profile.address.city, {
      delay: this.typingSpeed,
    });
  }

  async enterBillingDetails(): Promise<void> {
    this.setStatus(ScraperStatus.EnteringBillingDetails);
  }

  async proceedToPayment(): Promise<void> {
    this.setStatus(ScraperStatus.ProceedingToPayment);

    await this.waitAndClick('#addresses > [data-component="Button"]');

    await this.page?.waitForResponse(
      (response: any) =>
        response.url().endsWith("/token") &&
        response.status() === 200
    );

    await this.wait(1);

    const cardPaymentBtnSelector =
      '[data-component="PaymentMethods"] [data-component="CardPayment"] > button';
    await this.waitAndClick(cardPaymentBtnSelector);

    await this.page?.waitForNavigation();
  }

  async enterPaymentDetails(): Promise<void> {
    this.setStatus(ScraperStatus.EnteringPaymentDetails);

    await this.page?.type("#cardNumber", this.bot.paymentCard.number);

    await this.page?.type(
      "#cardholderName",
      `${this.bot.paymentCard.profile.firstName} ${this.bot.paymentCard.profile.lastName}`
    );

    let expMonth = this.bot.paymentCard.expMonth.toString();
    let expYear = this.bot.paymentCard.expYear.toString();

    if (expMonth.length == 1) {
      expMonth = `0${this.bot.paymentCard.expMonth}`;
    }

    if (expYear.length == 4) {
      expYear = expYear.slice(-2);
    }

    await this.page?.type("#expiryMonth", `${expMonth!}`, {
      delay: this.typingSpeed,
    });

    await this.page?.type("#expiryYear", `${expYear!}`, {
      delay: this.typingSpeed,
    });

    await this.page?.type(
      "#securityCode",
      `${this.bot.paymentCard.securityCode}`,
      { delay: this.typingSpeed }
    );
  }

  async placeOrder(): Promise<void> {
    this.setStatus(ScraperStatus.PlacingOrder);

    this.waitAndClick("#submitButton");
  }

  async confirmOrder(): Promise<void> {
    this.setStatus(ScraperStatus.Finished);

    const response = await this.page?.waitForResponse((response: any) =>
        response.url().includes("/paymentCardRequestResult"));

    console.log(response?.url().match(/paymentCardStatus=([^&]*)/)![1]);
  }
}
