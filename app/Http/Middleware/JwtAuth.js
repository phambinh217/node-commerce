const Jwt = require("@/app/Utilities/Jwt");

class JwtAuth {
  handle(req, res, next) {
    req.auth = {
      check: false,
      user: null,
    }

    const jsonWebToken = this.getJwtFromRequest(req);

    if (!jsonWebToken) {
      return next();
    }

    const user = Jwt.decodeJwtToUser(jsonWebToken);

    if (user) {
      req.auth.check = true
      req.auth.user = user
    }

    next();
  }

  getJwtFromRequest(req) {
    const jsonWebToken = req.headers.authorization;

    if (!jsonWebToken) {
      return null;
    }

    /**
     * Remove prefix Bearer
     */
    return jsonWebToken.replace("Bearer ", "");
  }
}

const jwtAuth = new JwtAuth();

module.exports = jwtAuth.handle.bind(jwtAuth);
