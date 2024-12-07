const { order } = require("@/config/ecommerce");

class OrderNumberManager {
  constructor() {
    this.prefix = order.orderNumberPrefix;
  }

  generate() {
    return `${this.prefix}${Date.now()}`;
  }
}

module.exports = OrderNumberManager;
