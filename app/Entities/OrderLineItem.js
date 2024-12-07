const { v4: uuidv4 } = require("uuid");

class OrderLineItem {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.quantity = data.quantity;
    this.price = data.price;
    this.sku = data.sku;
  }

  static make(data) {
    return new OrderLineItem(data);
  }
}

module.exports = OrderLineItem;
