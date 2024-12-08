const { v4: uuidv4 } = require("uuid");
const { PRODUCT_STATUS } = require("@/app/Consts/Product");

class Product {
  constructor(data) {
    /**
     * Basic info
     */
    this.id = data.id || uuidv4();
    this.sku = data.sku;
    this.barcode = data.barcode;
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
     * Options and variations
     */
    this.options = data.options ?? [];
    this.variations = data.variations;
  }

  static make(data) {
    return new Product(data);
  }

  getId() {
    return this.id;
  }

  getSku() {
    return this.sku;
  }

  getBarcode() {
    return this.barcode;
  }

  getPrice() {
    return this.price;
  }

  getGroup() {
    return this.group;
  }

  getType() {
    return this.type;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getShortDescription() {
    return this.shortDescription;
  }

  getStatus() {
    return this.status;
  }

  getManageStock() {
    return this.manageStock;
  }

  getStockQuantity() {
    return this.stockQuantity;
  }

  getImages() {
    return this.images;
  }

  getOptions() {
    return this.options;
  }

  getVariations() {
    return this.variations;
  }

  getPurchasable() {
    return true;
  }
}

module.exports = Product;
