const { googleDriveFactory } = require("@/app/GoogleSheet/Utilities/Google");
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
      const googleDrive = await googleDriveFactory();

      const response = await googleDrive.files.create({
        resource: {
          name: this.data.name,
          mimeType: "application/vnd.google-apps.spreadsheet",
        },
        fields: "id",
      });

      const fileId = response.data.id;

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
