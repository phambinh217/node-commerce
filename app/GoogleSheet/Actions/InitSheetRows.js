const { googleSheetFactory } = require("@/app/GoogleSheet/Utilities/Google");

class InitSheetRows {
  constructor(data) {
    this.data = data;
  }

  static make(data) {
    return new InitSheetRows(data);
  }

  async execute() {
    const sheets = await googleSheetFactory();

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.data.sheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: this.data.rows,
      },
    });
  }
}

module.exports = InitSheetRows;
