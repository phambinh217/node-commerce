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
        const variations = products.filter((p) => p.type === "variation");

        const { options, images } =
          GoogleSheetProductRow.getNestedProperties(mainProduct);

        return Product.make({
          ...mainProduct,
          options,
          images,
          variations: variations.map((variation) => {
            const { options, images } =
              GoogleSheetProductRow.getNestedProperties(variation);

            return Product.make({
              ...variation,
              options,
              images,
            });
          }),
        });
      })
      .value();
  }

  /**
   * Convert flat properties to nested
   */
  static getNestedProperties(row) {
    const optionNames = [];
    const optionValues = [];
    const images = [];

    for (let key in row) {
      if (["option1", "option2", "option3"].includes(key) && row[key]) {
        optionNames.push(row[key]);
      }

      if (["option1Value", "option2Value", "option3Value"].includes(key) && row[key]) {
        optionValues.push(row[key]);
      }

      if (["image1", "image2", "image3", "image4", "image5"].includes(key) && row[key]) {
        images.push(row[key]);
      }
    }

    const options = _.zip(optionNames, optionValues).map(([name, value]) => {
      if (row.type == 'product') {
        value = value.split(",").map((v) => v.trim());
      }

      return {
        name,
        value,
      }
    });

    return {
      options,
      images,
    };
  }
}

module.exports = GoogleSheetProductRow;
