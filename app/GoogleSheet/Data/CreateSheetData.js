class CreateSheetData {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
  }

  static make(data) {
    return new CreateSheetData(data);
  }
}

module.exports = CreateSheetData;
