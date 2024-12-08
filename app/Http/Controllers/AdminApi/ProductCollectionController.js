const ProductCollectionRepository = require("@/app/Repositories/ProductCollectionRepository");

class ProductCollectionController {
  constructor() {
    this.productCollectionRepository = new ProductCollectionRepository();
  }

  async index(req, res) {
    const productCollections = await this.productCollectionRepository.getWhere({});

    return res.json(productCollections.map(ProductCollectionController.getResource));
  }

  static getResource(productCollection) {
    return {
      id: productCollection.getId(),
      title: productCollection.getTitle(),
    };
  }
}

module.exports = new ProductCollectionController();
