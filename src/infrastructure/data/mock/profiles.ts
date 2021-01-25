import Profile from "@core/entities/Profile";

export const profiles: Profile[] = [
  {
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
];