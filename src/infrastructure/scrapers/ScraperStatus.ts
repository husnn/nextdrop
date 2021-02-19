enum ScraperStatus {
  Offline = 'Offline',
  Scheduled = 'Scheduled',
  Running = 'Running',
  Error = 'Error',
  SelectingProxy = 'Selecting Proxy',
  HarvestingCookies = 'Harvesting Cookies',
  SelectingAttributes = 'Selecting Attributes',
  CheckingStock = 'Checking Stock',
  AwaitingStock = 'Awaiting Stock',
  AddingToCart = 'Adding to Cart',
  BeginningCheckout = 'Beginning Checkout',
  EnteringShippingDetails = 'Entering Shipping Details',
  EnteringBillingDetails = 'Entering Billing Details',
  ProceedingToPayment = 'Proceeding to Payment',
  EnteringPaymentDetails = 'Entering Payment Details',
  PlacingOrder = 'Placing Order',
  Finished = 'Finished'
}

export default ScraperStatus;