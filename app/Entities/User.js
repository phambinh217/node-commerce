class User {
  constructor(data) {
    this.username = data?.username;
    this.fullName = data?.fullName;
    this.password = data?.password;
    this.permissions = data?.permissions ?? [];
  }

  static make(data) {
    return new User(data);
  }

  getId () {
    return this.id;
  }

  getUsername () {
    return this.username;
  }

  getFullName () {
    return this.fullName;
  }

  getPassword () {
    return this.password;
  }

  getPermissions () {
    return this.permissions;
  }
}

module.exports = User;
