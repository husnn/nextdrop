import Address from './types/Address';
import IProfile from './interfaces/IProfile';

export default class Profile implements IProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: Address;

  constructor(props: IProfile) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
    this.address = props.address;
  }
}