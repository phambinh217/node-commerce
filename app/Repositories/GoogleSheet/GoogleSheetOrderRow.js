const Order = require("@/app/Entities/Order");
const OrderLineItem = require("@/app/Entities/OrderLineItem");
const _ = require("lodash");

class GoogleSheetOrderRow {
  static fromRowsToOrder(rows) {
    return _.chain(rows)
      .groupBy("orderNumber")
      .map((rows) => {
        const mainOrder = rows.find((p) => p.type === "order");
        const lineItems = rows.filter((p) => p.type === "line_item");

        return Order.make({
          ...mainOrder,
          lineItems: lineItems.map((item) => OrderLineItem.make({
            ...item,
            sku: item.itemSku,
            name: item.itemName
          })),
        });
      })
      .value();
  }

  /**
   * Convert order object to google sheet rows
   * @param {app/Entities/Order} order
   * @returns array
   */
  static fromOrderToRows(order) {
    const rows = [];

    rows.push(
      GoogleSheetOrderRow.to({
        id: order.id,
        type: "order",
        orderNumber: order.orderNumber,
        billingName: order.billingName,
        billingPhone: order.billingPhone,
        billingEmail: order.billingEmail,
        billingAddress: order.billingAddress,
        discount: order.discount,
        subtotal: order.subtotal,
        total: order.total,
        paymentStatus: order.paymentStatus,
      })
    );

    for (const lineItem of order.lineItems) {
      rows.push(
        GoogleSheetOrderRow.to({
          id: lineItem.id,
          type: "line_item",
          orderNumber: order.orderNumber,
          itemSku: lineItem.sku,
          itemName: lineItem.name,
          price: lineItem.price,
          quantity: lineItem.quantity,
        })
      );
    }

    return rows;
  }

  static to(data) {
    return {
      id: data.id,

      /**
       * Order information
       */
      type: data.type,
      orderNumber: data.orderNumber,
      billingName: data.billingName,
      billingPhone: data.billingPhone,
      billingEmail: data.billingEmail,
      billingAddress: data.billingAddress,
      discount: data.discount,
      subtotal: data.subtotal,
      total: data.total,
      paymentStatus: data.paymentStatus,

      /**
       * Item information
       */
      itemSku: data.itemSku,
      itemName: data.itemName,
      price: data.price,
      quantity: data.quantity,
    };
  }
}

module.exports = GoogleSheetOrderRow;
