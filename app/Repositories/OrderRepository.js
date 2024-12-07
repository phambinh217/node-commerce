const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
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
    const results = await sendRequest(apiUrl, [
      {
        sheet: "orders",
        command: "LIST_ROWS_COMMAND",
        where,
      },
    ]);

    const data = arrFirst(results);

    if (!data) {
      return null;
    }

    const rows = data?.data;

    if (!rows) {
      return null;
    }

    return arrFirst(GoogleSheetOrderRow.fromRowsToOrder(rows));
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
          command: "UPDATE_OR_CREATE_ROW_COMMAND",
          data,
        };
      })
    );
  }

  updateItems(order, newLineItems) {
    const currentOrder = { ...order };
    const oldLineItems = currentOrder.lineItems.map((i) => i.id);

    order.lineItems = newLineItems;

    const rows = GoogleSheetOrderRow.fromOrderToRows(order);

    const payload = [
      /**
       * Delete old line items
       */
      ...oldLineItems.map((id) => ({
        sheet: "orders",
        command: "DELETE_ROW_COMMAND",
        where: { id },
      })),

      /**
       * Insert new line items
       */
      ...rows
      .filter((row) => row.type === "line_item")
      .map((data) => {
        return {
          sheet: "orders",
          command: "UPDATE_OR_CREATE_ROW_COMMAND",
          data,
        };
      }),
    ]

    return sendRequest(apiUrl, payload);
  }
}

module.exports = OrderRepository;
