const CreateOrder = require('@/app/Actions/CreateOrder');
const CreateOrderData = require('@/app/Data/CreateOrderData');
const BadAction = require('@/app/Utilities/BadAction');
const OrderRepository = require('@/app/Repositories/OrderRepository');

class OrderController {
  constructor () {
    this.orderRepository = new OrderRepository();
  }

  index(req, res) {
    return res.json({
      message: 'List of all orders',
    })
  }

  store (req, res) {
    const result = CreateOrder.make(CreateOrderData.make(req.body)).execute();

    if (BadAction.is(result)) {
      return result.badRequestJson(res);
    }

    return res.json(OrderController.getResource(result));
  }

  update (req, res) {
    //
  }

  static getResource (order) {
    return {
      id: order.id,
      billingName: order.billingName,
      billingPhoneNumber: order.billingPhoneNumber,
      billingEmail: order.billingEmail,
      lineItems: order.lineItems,
      discount: order.discount,
      subtotal: order.subtotal,
      total: order.total,
      paymentStatus: order.paymentStatus
    }
  }
}

module.exports = new OrderController;
