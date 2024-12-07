const { v4: uuidv4 } = require("uuid");
const { now } = require("@/app/Utilities/Datetime");

class OrderLineItem {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.quantity = data.quantity;
    this.price = data.price;
    this.sku = data.sku;
    this.subtotal = data.subtotal || 0;
    this.createdAt = data.createdAt || now().format('YYYY-MM-DD HH:mm:ss');
    this.updatedAt = data.updatedAt || now().format('YYYY-MM-DD HH:mm:ss');
  }

  static make(data) {
    return new OrderLineItem(data);
  }

  calculateTotal() {
    this.subtotal = this.quantity * this.price;
  }
}

module.exports = OrderLineItem;
