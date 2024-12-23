const { apiUrl } = require("@/config/googleSheet");
const { sendRequest } = require("@/app/Utilities/GoogleSheet");
const { arrFirst } = require("@/app/Utilities/Arr");
const Customer = require("@/app/Entities/Customer");

class CustomerRepository {
  async getWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "customers",
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

    return rows.map(Customer.make);
  }

  async findWhere(where) {
    const results = await sendRequest(apiUrl, [
      {
        sheet: "customers",
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

    return Customer.make(row);
  }
}

module.exports = CustomerRepository;
