const ProductRepository = require('@/app/Repositories/ProductRepository');

class ProductController {
  constructor () {
    this.productRepository = new ProductRepository();
  }

  async index(req, res) {
    await this.productRepository.load();

    return res.json({
      message: 'List of all products',
    })
  }

  static getResource (product) {
    return {
      //
    }
  }
}

module.exports = new ProductController;
