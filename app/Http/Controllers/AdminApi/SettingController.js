const SettingRepository = require("@/app/Repositories/SettingRepository");

class SettingController {
  constructor() {
    this.settingRepository = new SettingRepository();
  }

  async index(req, res) {
    const settings = await this.settingRepository.getWhere({});

    return res.json(settings.map(SettingController.getResource));
  }

  static getResource(setting) {
    return {
      group: setting.getGroup(),
      key: setting.getKey(),
      value: setting.getValue(),
    }
  }
}

module.exports = new SettingController();
