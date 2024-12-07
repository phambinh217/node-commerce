const OrderLineItem = require("@/app/Entities/OrderLineItem");
const OrderRepository = require("@/app/Repositories/OrderRepository");

class UpdateOrderLineItem {
  /**
   * @param app/Data/UpdateOrderLineItemData data
   */
  constructor(order, lineItems) {
    this.order = order;
    this.lineItems = lineItems;
    this.orderRepository = new OrderRepository();
  }

  static make(order, data) {
    return new UpdateOrderLineItem(order, data);
  }

  execute() {
    const newLineItems = this.lineItems.map(OrderLineItem.make);

    this.orderRepository.updateItems(this.order, newLineItems);

    this.order.calculateTotal();

    return true;
  }
}

module.exports = UpdateOrderLineItem;
