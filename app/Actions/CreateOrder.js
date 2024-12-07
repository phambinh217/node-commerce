const Order = require("@/app/Entities/Order");
const OrderLineItem = require("@/app/Entities/OrderLineItem");
const BadAction = require("@/app/Utilities/BadAction");
const OrderRepository = require("@/app/Repositories/OrderRepository");
const OrderNumberManager = require("@/app/Utilities/OrderNumberManager");

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

    const orderNumberManager = new OrderNumberManager();

    const order = Order.make({
      orderNumber: orderNumberManager.generate(),
      billingName: this.data.billingName,
      billingPhoneNumber: this.data.billingPhoneNumber,
      billingEmail: this.data.billingEmail,
      billingAddress: this.data.billingAddress,
      lineItems: this.data.lineItems?.map(OrderLineItem.make),
    });

    order.calculateTotal();

    this.orderRepository.create(order);

    return order;
  }
}

module.exports = CreateOrder;
