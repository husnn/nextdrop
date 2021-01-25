export type IAddress = {
  line: string;
  city: string;
  region?: string;
  postCode: string;
  country: string;
}

export type IProfile = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  address: IAddress;
}

export default class Profile implements IProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string
  address: IAddress;

  constructor(data: IProfile) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.emailAddress = data.emailAddress;
    this.address = data.address;
  }
}