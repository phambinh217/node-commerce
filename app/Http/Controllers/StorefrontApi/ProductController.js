const ProductRepository = require('@/app/Repositories/ProductRepository');

class ProductController {
  constructor () {
    this.productRepository = new ProductRepository();
  }

  async index(req, res) {
    const products = await this.productRepository.getWhere({});

    return res.json(products)
  }

  static getResource (product) {
    return {
      //
    }
  }
}

module.exports = new ProductController;
