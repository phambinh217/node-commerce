const Order = require("../Entities/Order");
const OrderLineItem = require("../Entities/OrderLineItem");
const BadAction = require("../Utilities/BadAction");

class CreateOrder {
  constructor(data) {
    this.data = data;
  }

  static make(data) {
    return new CreateOrder(data);
  }

  execute() {
    if (
      this.data.billingEmail &&
      this.data.billingEmail.includes("@") == false
    ) {
      return BadAction.fromString("Invalid email address");
    }

    const order = Order.make({
      billingName: this.data.billingName,
      billingPhoneNumber: this.data.billingPhoneNumber,
      billingEmail: this.data.billingEmail,
      lineItems: this.data.lineItems?.map(OrderLineItem.make),
    });

    order.calculateTotal();

    return order;
  }
}

module.exports = CreateOrder;
