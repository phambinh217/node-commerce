const {
  googleSheetFactory,
  googleDriveFactory,
} = require("@/app/GoogleSheet/Utilities/GoogleFactory");
const BadAction = require("@/app/Utilities/BadAction");

class CreateSheet {
  constructor(data) {
    this.data = data;
  }

  static make(data) {
    return new CreateSheet(data);
  }

  async execute() {
    try {
      const sheets = await googleSheetFactory();

      const response = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: this.data.name,
          },
          sheets: this.data.sheets,
        },
      });

      const fileId = response.data.spreadsheetId;

      const googleDrive = await googleDriveFactory();

      await googleDrive.permissions.create({
        fileId: fileId,
        requestBody: {
          type: "user",
          role: "writer",
          emailAddress: this.data.email,
        },
      });

      return response.data;
    } catch (error) {
      return BadAction.fromString("Failed to create Google Sheet: " + error);
    }
  }
}

module.exports = CreateSheet;
