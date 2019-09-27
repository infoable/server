class TokenGenerateError extends Error {
  constructor() {
    super("토큰을 만드는 데에 실패했습니다.");
    this.expose = true;
    this.status = 500;
  }
}

module.exports = TokenGenerateError;
