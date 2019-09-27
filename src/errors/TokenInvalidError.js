class TokenInvalidError extends Error {
  constructor(message) {
    this.message = message || "토큰이 유효하지 않습니다.";
    this.expose = true;
    this.status = 403;
  }
}

module.exports = TokenInvalidError;
