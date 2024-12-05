const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { jsonToString } = require("@/app/Utilities/Json");

class OrderRepository {
  getWhere(args) {
    //
  }

  findWhere(args) {
    //
  }

  /**
   * Create a new order
   * @param app/Entities/Order order
   * @return true
   */
  create(order) {
    return sendRequest(apiUrl, {
      sheet_title: "orders",
      command: "UPDATE_OR_CREATE_COMMAND",
      data: {
        id: order.id,
        billingName: order.billingName,
        billingPhoneNumber: order.billingPhoneNumber,
        billingEmail: order.billingEmail,
        lineItems: jsonToString(order.lineItems),
        paymentStatus: order.paymentStatus,
        discount: order.discount,
        subtotal: order.subtotal,
        total: order.total
      },
    })
  }

  update() {
    //
  }

  delete() {
    //
  }
}

module.exports = OrderRepository;
