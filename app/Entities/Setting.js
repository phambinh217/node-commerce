class Setting {
  constructor(data) {
    this.group = data.group;
    this.key = data.key;
    this.value = data.value;
  }

  static make(data) {
    return new Setting(data);
  }

  getGroup() {
    return this.group;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }
}

module.exports = Setting;
