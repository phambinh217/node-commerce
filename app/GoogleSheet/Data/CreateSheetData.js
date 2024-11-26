class CreateSheetData {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.sheets = data.sheets;
  }

  static make(data) {
    return new CreateSheetData(data);
  }
}

module.exports = CreateSheetData;
