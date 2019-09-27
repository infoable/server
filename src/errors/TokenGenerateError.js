class TokenGenerateError extends Error {
  constructor() {
    this.expose = true;
    this.message = "토큰을 만드는 데에 실패했습니다.";
    this.status = 500;
  }
}

module.exports = TokenGenerateError;
