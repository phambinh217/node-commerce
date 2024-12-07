const { v4: uuidv4 } = require("uuid");
const { PAYMENT_STATUS } = require("@/app/Consts/Order");
const { now } = require("@/app/Utilities/Datetime");

class Order {
  constructor(data) {
    this.id = data.id || uuidv4();

    /**
     * Get & set properties
     */
    this.billingName = data.billingName;
    this.billingPhone = data.billingPhone;
    this.billingEmail = data.billingEmail;
    this.lineItems = data.lineItems ?? [];
    this.discount = data.discount ?? 0;
    this.billingAddress = data.billingAddress;
    this.orderNumber = data.orderNumber;

    /**
     * Timestamps
     */
    this.createdAt = data.createdAt ?? now().format('YYYY-MM-DD HH:mm:ss');
    this.updatedAt = data.updatedAt ?? now().format('YYYY-MM-DD HH:mm:ss');

    /**
     * Payment properties
     */
    this.paymentStatus = data.paymentStatus ?? PAYMENT_STATUS.UNPAID;
    this.paidAt = data.paidAt;

    /**
     * Total
     */
    this.subtotal = data.subtotal ?? 0;
    this.total = data.total ?? 0;
    this.discount = data.discount ?? 0;
  }

  static make(data) {
    return new Order(data);
  }

  calculateTotal() {
    this.lineItems.forEach((item) => item.calculateTotal());

    this.subtotal = this.lineItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    this.total = this.subtotal - this.discount;
  }
}

module.exports = Order;
