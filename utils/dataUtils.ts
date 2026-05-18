import { faker } from '@faker-js/faker';

export function generateFirstName() {
  return `${faker.person.firstName()}${faker.string.nanoid(4)}`;
}

export function generateLastName() {
  return `${faker.person.lastName()}${faker.string.nanoid(4)}`;
}

export function generateEmployeeData() {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`
  };
}

export class DataUtils {
  generateFirstName() {
    return generateFirstName();
  }

  generateLastName() {
    return generateLastName();
  }

  generateEmployeeData() {
    return generateEmployeeData();
  }
}
