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
    const product = await this.productRepository.findWhere({ group });

    return res.json(ProductController.getResource(product));
  }

  static getResource(product) {
    return {
      id: product.getId(),
      sku: product.getSku(),
      barcode: product.getBarcode(),
      price: product.getPrice(),
      group: product.getGroup(),
      type: product.getType(),
      title: product.getTitle(),
      description: product.getDescription(),
      shortDescription: product.getShortDescription(),
      status: product.getStatus(),
      manageStock: product.getManageStock(),
      stockQuantity: product.getStockQuantity(),
      images: product.getImages(),
      options: product.getOptions(),
      variations: product.getVariations().map(variation => {
        return {
          id: variation.getId(),
          sku: variation.getSku(),
          barcode: variation.getBarcode(),
          price: variation.getPrice(),
          group: variation.getGroup(),
          type: variation.getType(),
          title: variation.getTitle(),
          description: variation.getDescription(),
          shortDescription: variation.getShortDescription(),
          status: variation.getStatus(),
          manageStock: variation.getManageStock(),
          stockQuantity: variation.getStockQuantity(),
          images: variation.getImages(),
          options: variation.getOptions(),
          purchasable: variation.getPurchasable(),
        }
      }),
      purchasable: product.getPurchasable(),
    }
  }
}

module.exports = new ProductController();
