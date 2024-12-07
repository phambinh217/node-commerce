const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
const ProductCollection = require("@/app//Entities/ProductCollection");

class ProductCollectionRepository {
  async getWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "product_collections",
        command: "LIST_ROWS_COMMAND",
        where,
      },
    ]);

    const data = arrFirst(results);

    if (!data) {
      return null;
    }

    const rows = data?.data;

    if (!rows) {
      return null;
    }

    return rows.map(ProductCollection.make);
  }
}

module.exports = ProductCollectionRepository;
