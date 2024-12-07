const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const Order = require("@/app/Entities/Order");
const OrderLineItem = require("@/app/Entities/OrderLineItem");
const GoogleSheetOrderRow = require("@/app/Repositories/GoogleSheet/GoogleSheetOrderRow");

class OrderRepository {


  getWhere(where) {
    return sendRequest(apiUrl, {
      sheet_title: "orders",
      command: "LIST_ROWS_COMMAND",
      where,
    });
  }

  /**
   * Find an order by where
   *
   * @param Object where
   * @returns null|app/Entities/Order
   */
  async findWhere(where) {
    const { data: orderData } = await sendRequest(apiUrl, {
      sheet_title: "orders",
      command: "FIND_ROW_COMMAND",
      where,
    });

    if (!orderData) {
      return null;
    }

    if (orderData.lineItems) {
      orderData.lineItems = JSON.parse(orderData.lineItems).map(
        OrderLineItem.make
      );
    }

    return Order.make(orderData);
  }

  /**
   * Create a new order
   *
   * @param app/Entities/Order order
   * @return Promise
   */
  create(order) {
    const rows = GoogleSheetOrderRow.fromOrderToRows(order);

    return sendRequest(
      apiUrl,
      rows.map((data) => {
        return {
          sheet: "orders",
          command: "UPDATE_OR_CREATE_COMMAND",
          data,
        };
      })
    );
  }

  update() {
    //
  }
}

module.exports = OrderRepository;
