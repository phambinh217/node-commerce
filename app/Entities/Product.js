const { v4: uuidv4 } = require("uuid");
const { PRODUCT_STATUS } = require("@/app/Consts/Product");

class Product {
  constructor(data) {
    /**
     * Basic info
     */
    this.id = data.id || uuidv4();
    this.sku = data.sku;
    this.price = data.price;
    this.group = data.group;
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.shortDescription = data.shortDescription;
    this.status = data.status;

    /**
     * Stock information
     */
    this.manageStock = data.manageStock ?? false;
    this.stockQuantity = data.stockQuantity ?? 0;
    this.status = data.status ?? PRODUCT_STATUS.ACTIVE;

    /**
     * Images information
     */
    this.images = data.images ?? [];

    /**
     * Options and variants
     */
    this.options = data.options ?? [];
    this.variants = data.variants;
  }

  static make(data) {
    return new Product(data);
  }
}

module.exports = Product;
