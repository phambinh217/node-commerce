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
    return setting;
  }
}

module.exports = new SettingController();
