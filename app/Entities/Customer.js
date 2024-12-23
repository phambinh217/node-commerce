const { v4: uuidv4 } = require("uuid");

class Customer {
  constructor(data) {
    this.id = data?.id || uuidv4();
    this.name = data?.name;
    this.phone = data?.phone;
    this.email = data?.email;
    this.address1 = data?.address1;
    this.address2 = data?.address2;
    this.company = data?.company;
    this.city = data?.city;
    this.postcode = data?.postcode;
    this.country = data?.country;
    this.state = data?.state;
  }

  static make(data) {
    return new Customer(data);
  }

  getName() {
    return this.name;
  }

  getCompany() {
    return this.company;
  }

  getCountry() {
    return this.country;
  }

  getState() {
    return this.state;
  }

  getCity() {
    return this.city;
  }

  getPostcode() {
    return this.postcode;
  }

  getAddress1() {
    return this.address1;
  }

  /**
   * Alias of getAddress
   */
  getAddress() {
    return this.getAddress1();
  }

  getAddress2() {
    return this.address2;
  }

  getPhone() {
    return this.phone;
  }

  getEmail() {
    return this.email;
  }
}

module.exports = Customer;
