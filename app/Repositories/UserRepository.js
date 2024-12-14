const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
const User = require("@/app/Entities/User");

class UserRepository {
  async getWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "users",
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

    return rows.map(User.make);
  }

  async findWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "users",
        command: "FIND_ROW_COMMAND",
        where,
      },
    ]);

    const data = arrFirst(results);

    if (!data) {
      return null;
    }

    const row = data?.data;

    if (!row) {
      return null;
    }

    return User.make(row);
  }
}

module.exports = UserRepository;
