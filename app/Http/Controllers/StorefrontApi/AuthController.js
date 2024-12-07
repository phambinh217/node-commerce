class AuthController {
  async me(req, res) {
    return res.json(this.getResource());
  }

  async login(req, res) {
    return res.json({
      token: '123123',
      user: this.getResource(),
    });
  }

  async logout(req, res) {
    return res.json({
      //
    })
  }

  getResource() {
    return {
      id: 1,
      fullName: "John Doe",
      permissions: [],
    }
  }
}

module.exports = new AuthController();
