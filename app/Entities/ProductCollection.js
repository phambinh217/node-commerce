const { v4: uuidv4 } = require("uuid");

class ProductCollection {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.title = data.title;
  }

  static make(data) {
    return new ProductCollection(data);
  }
}

module.exports = ProductCollection;
