import Profile from "./Profile";
import Retailer from "./Retailer"

export type IBot = {
  id?: string;
  retailer: string;
  productUrl: string;
  profile: string;
}

export default class Bot implements IBot {
  id?: string;
  retailer: Retailer['name'];
  productUrl: string;
  profile: Profile['id'];

  constructor(data: IBot) {
    this.id = data.id;
    this.retailer = data.retailer;
    this.productUrl = data.productUrl;
    this.profile = data.profile;
  }
}