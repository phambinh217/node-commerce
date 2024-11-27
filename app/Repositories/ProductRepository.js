const ReadSheet = require("@/app/GoogleSheet/Actions/ReadSheet");
const { sheetId } = require("@/config/database");

class ProductRepository {
  static products = [];

  constructor() {
    //
  }

  async load () {
    if (!ProductRepository.products.length) {
      const rows = await ReadSheet.make({
        sheetId,
        sheetTitle: "products",
      }).execute();
    }
  }

  getWhere(args) {
    //
  }

  findWhere(args) {
    //
  }

  create() {
    //
  }

  update() {
    //
  }

  delete() {
    //
  }
}

module.exports = ProductRepository;
