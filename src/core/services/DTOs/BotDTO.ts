import Retailer from "@core/entities/Retailer";
import Profile from "@core/entities/Profile";

export default interface BotDTO {
  id?: string;
  retailer: Retailer;
  productUrl: string;
  profile: Profile;
}