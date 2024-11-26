const CreateSheet = require("@/app/GoogleSheet/Actions/CreateSheet");
const CreateSheetData = require("@/app/GoogleSheet/Data/CreateSheetData");
const {
  gSheet,
  gSheetRows,
  gSheetRow,
} = require("@/app/GoogleSheet/Utilities/Google");

class InitSheetDatabase {
  constructor(data) {
    this.data = data;
  }

  static make(data) {
    return new InitSheetDatabase(data);
  }

  async execute() {
    const sheets = [
      gSheet({
        title: "Products",
        data: gSheetRows([
          gSheetRow(["Name", "Email", "Address"]),
          gSheetRow(["Product 1", "p1@p1.com", "123 Main St"]),
          gSheetRow(["Product 2", "p2@p2.com", "456 Elm St"]),
        ]),
      }),

      gSheet({
        title: "Orders",
      }),
    ];

    const sheetData = await CreateSheet.make(
      CreateSheetData.make({
        name: this.data.name,
        email: this.data.email,
        sheets,
      })
    ).execute();

    return sheetData;
  }
}

module.exports = InitSheetDatabase;
