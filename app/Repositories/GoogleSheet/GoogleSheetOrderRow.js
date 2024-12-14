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
        const shippingLines = rows.filter((p) => p.type === "shipping_line");
        const discountLines = rows.filter((p) => p.type === "discount_line");
        const feeLines = rows.filter((p) => p.type === "fee_line");

        return Order.make({
          ...mainOrder,

          lineItems: lineItems.map((item) => OrderLineItem.make({
            ...item,
            sku: item.itemSku,
            name: item.itemName
          })),

          shippingLines: shippingLines.map((item) => ({
            ...item,
            sku: item.itemSku,
            name: item.itemName
          })),

          discountLines: discountLines.map((item) => ({
            ...item,
            sku: item.itemSku,
            name: item.itemName
          })),

          feeLines: feeLines.map((item) => ({
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
        id: order.getId(),
        type: "order",
        orderNumber: order.getOrderNumber(),
        billingName: order.getBillingName(),
        billingPhone: order.getBillingPhone(),
        billingEmail: order.getBillingEmail(),
        billingAddress: order.getBillingAddress(),
        discount: order.getDiscount(),
        subtotal: order.getSubtotal(),
        total: order.getTotal(),
        status: order.getStatus(),
        customerNote: order.getCustomerNote(),
        customerId: order.getCustomerId(),
        paymentStatus: order.getPaymentStatus(),
        createdAt: order.getCreatedAt(),
        updatedAt: order.getUpdatedAt(),
      })
    );

    for (const lineItem of order.getLineItems()) {
      rows.push(
        GoogleSheetOrderRow.to({
          id: lineItem.getId(),
          type: "line_item",
          orderNumber: order.getOrderNumber(),
          itemSku: lineItem.getSku(),
          itemName: lineItem.getName(),
          price: lineItem.getPrice(),
          quantity: lineItem.getQuantity(),
          discount: 0,
          subtotal: lineItem.getSubtotal(),
          createdAt: lineItem.getCreatedAt(),
          updatedAt: lineItem.getUpdatedAt(),
        })
      );
    }

    for (const shippingLine of order.getShippingLines()) {
      rows.push(
        GoogleSheetOrderRow.to({
          id: shippingLine.getId(),
          type: "shipping_line",
          orderNumber: order.getOrderNumber(),
          itemSku: shippingLine.getSku(),
          itemName: shippingLine.getName(),
          price: shippingLine.getPrice(),
          quantity: 1,
          discount: 0,
          subtotal: shippingLine.getPrice(),
          createdAt: shippingLine.getCreatedAt(),
          updatedAt: shippingLine.getUpdatedAt(),
        })
      );
    }

    for (const discountLine of order.getDiscountLines()) {
      rows.push(
        GoogleSheetOrderRow.to({
          id: discountLine.getId(),
          type: "discount_line",
          orderNumber: order.getOrderNumber(),
          itemSku: discountLine.getSku(),
          itemName: discountLine.getName(),
          price: 0,
          quantity: 1,
          subtotal: 0,
          discount: discountLine.getDiscount(),
          createdAt: discountLine.getCreatedAt(),
          updatedAt: discountLine.getUpdatedAt(),
        })
      );
    }

    for (const feeLine of order.getFeeLines()) {
      rows.push(
        GoogleSheetOrderRow.to({
          id: feeLine.getId(),
          type: "fee_line",
          orderNumber: order.getOrderNumber(),
          itemSku: feeLine.getSku(),
          itemName: feeLine.getName(),
          price: feeLine.getPrice(),
          quantity: 1,
          discount: 0,
          subtotal: feeLine.getPrice(),
          createdAt: feeLine.getCreatedAt(),
          updatedAt: feeLine.getUpdatedAt(),
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,

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
