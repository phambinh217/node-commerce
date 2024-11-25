const { google } = require("googleapis");

const KEY_FILE_PATH = "./storage/keys/google-api-key.json";

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const googleDriveFactory = async () => {
  const authClient = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: authClient });

  return drive;
}

const googleSheetFactory = async () => {
  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  return sheets;
}

module.exports = {
  googleDriveFactory,
  googleSheetFactory,
}
