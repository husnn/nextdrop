import IRetailer from './interfaces/IRetailer';

export default class Retailer implements IRetailer {
  id: string;
  name: string;
  homeUrl: string;

  constructor(props: IRetailer) {
    this.id = props.id;
    this.name = props.name;
    this.homeUrl = props.homeUrl;
  }
}