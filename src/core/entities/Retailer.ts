export type IRetailer = {
  id: string;
  name: string;
  homeUrl: string;
}

export default class Retailer implements IRetailer {
  id: string;
  name: string;
  homeUrl: string;

  constructor(data: IRetailer) {
    this.id = data.id;
    this.name = data.name;
    this.homeUrl = data.homeUrl;
  }
}