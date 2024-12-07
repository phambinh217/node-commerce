const { v4: uuidv4 } = require("uuid");

class Product {
  constructor(data) {
    console.log(data);

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
    this.status = data.status ?? "active";

    /**
     * Images information
     */
    this.image1 = data.image1;
    this.image2 = data.image2;

    /**
     * Options and variants
     */
    this.option1 = data.option1;
    this.option1Value = data.option1Value;
    this.option2 = data.option2;
    this.option2Value = data.option2Value;
    this.option3 = data.option3;
    this.option3Value = data.option3Value;
    this.variants = data.variants;
  }

  static make(data) {
    return new Product(data);
  }
}

module.exports = Product;
