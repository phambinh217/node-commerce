const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
const Product = require("@/app/Entities/Product");
const GoogleSheetProductRow = require("@/app/Repositories/GoogleSheet/GoogleSheetProductRow");

class ProductRepository {
  async getWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "products",
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

    return GoogleSheetProductRow.fromRowsToProduct(rows);
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
