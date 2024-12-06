class CreateOrderData {
  constructor(data) {
    this.billingName = data.billingName;
    this.billingPhoneNumber = data.billingPhoneNumber;
    this.billingEmail = data.billingEmail;
    this.lineItems = data.lineItems;
    this.billingAddress = data.billingAddress;
  }

  static make(data) {
    return new CreateOrderData(data);
  }
}

module.exports = CreateOrderData;
