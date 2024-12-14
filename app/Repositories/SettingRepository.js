const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
const Setting = require("@/app/Entities/Setting");

class SettingRepository {
  async getWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "settings",
        command: "LIST_ROW_COMMAND",
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

    return rows.map(Setting.make);
  }
}

module.exports = SettingRepository;
