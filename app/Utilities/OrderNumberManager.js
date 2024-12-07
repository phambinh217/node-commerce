class OrderNumberManager {
  constructor() {
    this.prefix = 'SHOP1-';
  }

  generate() {
    return `${this.prefix}-${Date.now()}`;
  }
}

module.exports = OrderNumberManager;
