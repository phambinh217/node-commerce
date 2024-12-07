class Setting {
  constructor(data) {
    this.group = data.group;
    this.key = data.key;
    this.value = data.value;
  }

  static make(data) {
    return new Setting(data);
  }
}

module.exports = Setting;
