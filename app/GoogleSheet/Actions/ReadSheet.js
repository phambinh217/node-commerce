const {
  googleSheetFactory,
} = require("@/app/GoogleSheet/Utilities/GoogleFactory");

class ReadSheet {
  constructor(data) {
    this.sheetId = data.sheetId;
    this.sheetTitle = data.sheetTitle;
  }

  static make(data) {
    return new ReadSheet(data);
  }

  async execute() {
    const sheets = await googleSheetFactory();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: this.sheetTitle,
    });

    return response.data.values;
  }
}

module.exports = ReadSheet;
