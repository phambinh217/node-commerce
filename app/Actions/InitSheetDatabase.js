const CreateSheet = require("@/app/GoogleSheet/Actions/CreateSheet");
const CreateSheetData = require("@/app/GoogleSheet/Data/CreateSheetData");
const InitSheetRows = require("@/app/GoogleSheet/Actions/InitSheetRows");

class InitSheetDatabase {
  constructor(data) {
    this.data = data;
  }

  static make(data) {
    return new InitSheetDatabase(data);
  }

  async execute() {
    /**
     * Step 1. Create new blank sheet
     */
    const sheetData = await CreateSheet.make(
      CreateSheetData.make({
        name: this.data.name,
        email: this.data.email,
      })
    ).execute();

    /**
     * Initialize rows as database
     */
    await InitSheetRows.make({
      sheetId: sheetData.id,
      rows: [["Name", "Email"]],
    }).execute();

    return sheetData;
  }
}

module.exports = InitSheetDatabase;
