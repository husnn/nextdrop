import Bot from "@core/entities/Bot";
import BotDTO from "@core/services/DTOs/BotDTO";

export const bots: Bot[] = [
  {
    id: 'uniqueidentifier,sir',
    retailer: '1',
    productUrl: 'https://currys.co.uk/ps5',
    profile: ''
  }
]

export const botDTOs: BotDTO[] = [
  {
    id: 'uniqueidentifier,sir',
    retailer: {
      id: '2',
      name: 'Currys',
      homeUrl: 'https://currys.co.uk/ps5'
    },
    productUrl: 'https://currys.co.uk/ps5',
    profile: {
      id: 'veryuniqueid',
      firstName: 'Husnain',
      lastName: 'Javed',
      emailAddress: 'test@test.com',
      address: {
        line: '123 Main Street',
        city: 'London',
        postCode: 'AB12 3AD',
        country: 'United Kingdom'
      }
    }
  }
]