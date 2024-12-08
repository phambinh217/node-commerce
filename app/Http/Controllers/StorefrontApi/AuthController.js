const UserRepository = require("@/app/Repositories/UserRepository");
const Jwt = require("@/app/Utilities/Jwt");

class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(req, res) {
    const user = req.auth.user;

    return res.json(this.getResource(user));
  }

  async login(req, res) {
    const requestPassword = req.body.password;
    const requestUsername = req.body.username;

    if (!requestPassword || !requestUsername) {
      return res.status(422).json({ message: "Missing username or password" });
    }

    const user = await this.userRepository.findWhere({
      username: requestUsername,
    });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Username or password incorrect (1)" });
    }

    if (user.getPassword() !== requestPassword) {
      return res
        .status(422)
        .json({ message: "Username or password incorrect (1)" });
    }

    const token = Jwt.makeFromUser(user).getJwt();

    return res.json({
      token,
      user: this.getResource(user),
    });
  }

  async logout(req, res) {
    return res.json({
      //
    });
  }

  getResource(user) {
    return {
      id: user.getId(),
      username: user.getUsername(),
      fullName: user.getFullName(),
      permissions: [],
    };
  }
}

module.exports = new AuthController();
