class Product {
  constructor(data) {
    this.name = data.name;
    this.sku = data.sku;
    this.price = data.price;
    this.images = data.images;
  }

  static make(data) {
    return new Product(data);
  }
}

module.exports = Product;
