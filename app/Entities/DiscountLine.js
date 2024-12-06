class DiscountLine {
  constructor(data) {
    this.name = data.name;
    this.amount = data.amount;
    this.code = data.code;
  }

  static make(data) {
    return new DiscountLine(data);
  }
}

module.exports = DiscountLine;
