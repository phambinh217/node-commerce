const { secret } = require("@/config/jwt");
const { base64Encode, base64Decode } = require("@/app/Utilities/Str");
const md5 = require("js-md5");
const User = require("@/app/Entities/User");

class Jwt {
  constructor({ secret, header, payload }) {
    this.secret = secret;
    this.header = header;
    this.payload = payload;
  }

  getJwt() {
    const payloadAsString = base64Encode(JSON.stringify(this.payload));
    const headerAsString = base64Encode(JSON.stringify(this.header));
    const sign = md5(payloadAsString + headerAsString + this.secret);

    return `${headerAsString}.${payloadAsString}.${sign}`;
  }

  static decodeJwtToUser(jwt) {
    try {
      const [header, payload] = jwt.split(".");

      const jwtObject = new Jwt({
        secret,
        header: JSON.parse(base64Decode(header)),
        payload: JSON.parse(base64Decode(payload)),
      });

      /**
       * Try to validate the jwt
       */
      if (jwtObject.getJwt() !== jwt) {
        return null;
      }

      return User.make(jwtObject.payload);
    } catch (error) {
      console.error(error);

      return null
    }
  }

  /**
   * Create jwt from user object
   * @param {app/Entities/User} user
   * @returns {string}
   */
  static makeFromUser(user) {
    return new Jwt({
      secret,
      header: {
        alg: "HS256",
        typ: "JWT",
      },
      payload: {
        id: user.getId(),
        username: user.getUsername(),
        fullName: user.getFullName(),
        permissions: user.getPermissions(),
      },
    });
  }
}

module.exports = Jwt;
