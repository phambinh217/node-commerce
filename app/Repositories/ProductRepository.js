const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const Product = require("@/app/Entities/Product");
const _ = require("lodash");

class ProductRepository {
  /**
   * Convert from google sheet rows to products
   *
   * @param {Array} rows
   * @returns array
   */
  toProducts(rows) {
    return _.chain(rows)
      .groupBy("group")
      .map((products) => {
        const mainProduct = products.find((p) => p.type === "product");
        const variants = products.filter((p) => p.type === "variant");

        return {
          ...Product.make(mainProduct),
          variants: variants.map((v) => Product.make(v)),
        };
      })
      .value();
  }

  async getWhere(where) {
    const { data: rows } = await sendRequest(apiUrl, {
      sheet_title: "products",
      command: "LIST_ROWS_COMMAND",
      where,
    });

    if (!rows) {
      return null;
    }

    return this.toProducts(rows);
  }

  /**
   * Find an order by where
   *
   * @param Object where
   * @returns null|app/Entities/Product
   */
  async findWhere(where) {
    const { data: productData } = await sendRequest(apiUrl, {
      sheet_title: "products",
      command: "FIND_ROW_COMMAND",
      where,
    });

    if (!productData) {
      return null;
    }

    return Product.make(productData);
  }
}

module.exports = ProductRepository;
