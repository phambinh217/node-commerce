class RequiredAuth {
  handle(req, res, next) {
    const user = req.auth.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  }
}

const requiredAuth = new RequiredAuth();

module.exports = requiredAuth.handle.bind(requiredAuth);
