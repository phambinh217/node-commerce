class OrderLineItem {
  constructor(data) {
    this.name = data.name;
    this.quantity = data.quantity;
    this.price = data.price;
  }

  static make(data) {
    return new OrderLineItem(data);
  }
}

module.exports = OrderLineItem;
