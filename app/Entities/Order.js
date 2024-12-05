const { v4: uuidv4 } = require("uuid");

class Order {
  constructor(data) {
    this.id = data.id || uuidv4();

    /**
     * Get & set properties
     */
    this.billingName = data.billingName;
    this.billingPhoneNumber = data.billingPhoneNumber;
    this.billingEmail = data.billingEmail;
    this.lineItems = data.lineItems || [];
    this.discount = data.discount ?? 0;

    /**
     * Readonly properties
     */
    this.subtotal = 0;
    this.total = 0;
  }

  static make(data) {
    return new Order(data);
  }

  calculateTotal() {
    this.subtotal = this.lineItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.total = this.subtotal - this.discount;
  }
}

module.exports = Order;
