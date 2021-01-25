import Bot from "@core/entities/Bot";
import IBotRepository from "@core/repositories/IBotRepository";
import IProfileRepository from "@core/repositories/IProfileRepository";
import IRetailerRepository from "@core/repositories/IRetailerRepository";
import { profiles } from "@infrastructure/data/mock/profiles";
import BotDTO from "./DTOs/BotDTO";

export default class BotService {
  botRepository: IBotRepository;
  retailerRepository: IRetailerRepository;
  profileRepository: IProfileRepository;
  
  constructor(botRepository: IBotRepository, retailerRepository: IRetailerRepository, profileRepository: IProfileRepository) {
    this.retailerRepository = retailerRepository;
    this.botRepository = botRepository;
    this.profileRepository = profileRepository;
  }

  async createOrUpdate(data: Bot) {
    if (data.id) {
      await this.botRepository.update(data);
      return;
    }

    await this.botRepository.create(data);
  }

  async getAll(): Promise<BotDTO[]> {
    let bots = await this.botRepository.getAll();

    let results: BotDTO[] = [];

    for await (const bot of bots) {
      const retailer = this.retailerRepository.get(bot.retailer);
      const profile = await this.profileRepository.get(bot.profile);

      // if (!retailer || !profile) continue;

      results.push({ ...bot, retailer, profile });
    }

    return results;
  }

  async clone(data: BotDTO): Promise<void> {
    const { id, ...newData } = data;
    const bot = new Bot({ ...newData, retailer: data.retailer.id, profile: data.profile.id });
    this.createOrUpdate(bot);
  }
}