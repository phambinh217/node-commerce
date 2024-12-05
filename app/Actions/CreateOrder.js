const Order = require("@/app/Entities/Order");
const OrderLineItem = require("@/app/Entities/OrderLineItem");
const BadAction = require("@/app/Utilities/BadAction");
const OrderRepository = require("@/app/Repositories/OrderRepository");

class CreateOrder {
  /**
   * @param app/Data/CreateOrderData data
   */
  constructor(data) {
    this.data = data;
    this.orderRepository = new OrderRepository();
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
      paymentStatus: "unpaid",
    });

    order.calculateTotal();

    this.orderRepository.create(order);

    return order;
  }
}

module.exports = CreateOrder;
