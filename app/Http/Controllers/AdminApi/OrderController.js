const CreateOrder = require("@/app/Actions/CreateOrder");
const UpdateUnpaidOrder = require("@/app/Actions/UpdateUnpaidOrder");
const BadAction = require("@/app/Utilities/BadAction");
const OrderRepository = require("@/app/Repositories/OrderRepository");
const UpdateOrderLineItem = require("@/app/Actions/UpdateOrderLineItem");

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  index(req, res) {
    return res.json({
      message: "List of all orders",
    });
  }

  create(req, res) {
    const result = CreateOrder.make(req.body).execute();

    if (BadAction.is(result)) {
      return result.badRequestJson(res);
    }

    return res.json(OrderController.getResource(result));
  }

  async show(req, res) {
    const orderNumber = req.params.orderNumber;
    const order = await this.orderRepository.findWhere({
      orderNumber: orderNumber,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(OrderController.getResource(order));
  }

  async updateWhenOrderIsUnpaid(req, res) {
    const orderNumber = req.params.orderNumber;
    const order = await this.orderRepository.findWhere({
      orderNumber: orderNumber,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const result = UpdateUnpaidOrder.make(order, req.body).execute();

    if (BadAction.is(result)) {
      return result.badRequestJson(res);
    }

    return res.json(OrderController.getResource(order));
  }

  async updateItems(req, res) {
    const orderNumber = req.params.orderNumber;
    const order = await this.orderRepository.findWhere({
      orderNumber: orderNumber,
    });

    const result = UpdateOrderLineItem.make(order, req.body).execute();

    if (BadAction.is(result)) {
      return result.badRequestJson(res);
    }

    return res.json(OrderController.getResource(order));
  }

  updateDiscount(req, res) {
    //
  }

  updateBilling(req, res) {
    //
  }

  pay(req, res) {
    //
  }

  static getResource(order) {
    return {
      id: order.getId(),
      orderNumber: order.getOrderNumber(),
      billingName: order.getBillingName(),
      billingAddress: order.getBillingAddress(),
      billingPhone: order.getBillingPhone(),
      billingEmail: order.getBillingEmail(),
      lineItems: order.getLineItems(),
      discount: order.getDiscount(),
      subtotal: order.getSubtotal(),
      total: order.getTotal(),
      paymentStatus: order.getPaymentStatus(),
      status: order.getStatus(),
      shippingLines: order.getShippingLines(),
      feeLines: order.getFeeLines(),
      discountLines: order.getDiscountLines(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
    };
  }
}

module.exports = new OrderController();
