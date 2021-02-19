import Address from '@core/entities/types/Address';

export default interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: Address;
}