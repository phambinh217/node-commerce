class BadAction {
  constructor (message, details) {
    this.message = message
    this.details = details
  }

  static is (instance) {
    return instance instanceof BadAction
  }

  static fromString (message, details) {
    return new BadAction(message, details)
  }

  badRequestJson (res) {
    return res.status(400).json({ message: this.message, details: this.details })
  }
}

module.exports = BadAction
