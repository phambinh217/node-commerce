const OrderShippingLine = require("@/app/Entities/OrderShippingLine");
const OrderLineItem = require("@/app/Entities/OrderLineItem");
const OrderFeeLine = require("@/app/Entities/OrderFeeLine");
const OrderDiscountLine = require("@/app/Entities/OrderDiscountLine");
const Address = require("@/app/Entities/Address");
const OrderRepository = require("@/app/Repositories/OrderRepository");
const BadAction = require("@/app/Utilities/BadAction");

class UpdateUnpaidOrder {
  /**
   * @param {app/Entities/Order} order
   * @param {array} data
   */
  constructor(order, data) {
    this.order = order;
    this.data = data;
    this.orderRepository = new OrderRepository();
  }

  static make(order, data) {
    return new UpdateUnpaidOrder(order, data);
  }

  execute() {
    if (this.order.getPaymentStatus() !== "unpaid") {
      return BadAction.fromString("Only update unpaid orders");
    }

    if (this.data.billing) {
      this.order.setBilling(Address.make(this.data.billing));
    }

    if (this.data.orderNumber) {
      this.order.setOrderNumber(this.data.orderNumber);
    }

    if (this.data.customerNote) {
      this.order.setCustomerNote(this.data.customerNote);
    }

    if (this.data.shippingLines) {
      this.order.setShippingLines(
        this.data.shippingLines.map(OrderShippingLine.make)
      );
    }

    if (this.data.lineItems) {
      this.order.setLineItems(this.data.lineItems.map(OrderLineItem.make));
    }

    if (this.data.feeLines) {
      this.order.setFeeLines(this.data.feeLines.map(OrderFeeLine.make));
    }

    if (this.data.discountLines) {
      this.order.setDiscountLines(
        this.data.discountLines.map(OrderDiscountLine.make)
      );
    }

    this.order.calculateTotal();

    this.orderRepository.updateWhole(this.order);

    return this.order;
  }
}

module.exports = UpdateUnpaidOrder;
