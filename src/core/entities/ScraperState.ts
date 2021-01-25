export enum ScraperState {
  Started,
  SelectingProxy,
  HarvestingCookies,
  SelectingAttributes,
  CheckingStock,
  WaitingForStock,
  AddingToCart,
  BeginningCheckout,
  EnteringShippingDetails,
  EnteringBillingDetails,
  ProceedingToPayment,
  EnteringPaymentDetails,
  PlacingOrder,
  Finished
}