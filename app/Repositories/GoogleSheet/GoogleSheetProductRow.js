const _ = require("lodash");
const Product = require("@/app/Entities/Product");

class GoogleSheetProductRow {
  /**
   * Convert from google sheet rows to products
   *
   * @param {Array} rows
   * @returns array
   */
  static fromRowsToProduct(rows) {
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
}

module.exports = GoogleSheetProductRow;
