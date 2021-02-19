import Address from '@core/entities/types/Address';

type CreateProfileRequestModel = {
  firstName: string;
  lastName: string;
  emailAddress: string
  address: Address;
}

export default class CreateProfileRequest implements CreateProfileRequestModel {
  firstName: string;
  lastName: string;
  emailAddress: string;
  address: Address;

  constructor(props: CreateProfileRequestModel) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.address = props.address;
  }
}