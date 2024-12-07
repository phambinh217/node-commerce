const ProductRepository = require("@/app/Repositories/ProductRepository");

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async index(req, res) {
    const products = await this.productRepository.getWhere({});

    return res.json(products.map(ProductController.getResource));
  }

  async show(req, res) {
    const group = req.params.group;
    const products = await this.productRepository.findWhere({ group });

    return res.json(ProductController.getResource(products));
  }

  static getResource(product) {
    return product;
  }
}

module.exports = new ProductController();
