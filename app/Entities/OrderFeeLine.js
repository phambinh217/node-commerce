const { v4: uuidv4 } = require("uuid");
const { now } = require("@/app/Utilities/Datetime");

class OrderFeeLine {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.sku = data.sku;
    this.price = data.price || 0;
    this.createdAt = data.createdAt || now().format("YYYY-MM-DD HH:mm:ss");
    this.updatedAt = data.updatedAt || now().format("YYYY-MM-DD HH:mm:ss");
  }

  static make(data) {
    return new OrderFeeLine(data);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getSku() {
    return this.sku;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}

module.exports = OrderFeeLine;
