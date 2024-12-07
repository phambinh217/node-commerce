class CreateOrderData {
  constructor(data) {
    this.billingName = data.billingName;
    this.billingPhone = data.billingPhone;
    this.billingEmail = data.billingEmail;
    this.lineItems = data.lineItems;
    this.billingAddress = data.billingAddress;
    this.orderNumber = data.orderNumber;
  }

  static make(data) {
    return new CreateOrderData(data);
  }
}

module.exports = CreateOrderData;
