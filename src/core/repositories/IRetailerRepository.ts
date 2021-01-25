import Retailer from "@core/entities/Retailer";

export default interface IRetailerRepository {
  get(name: string): Retailer;
  getAll(): Retailer[];
}