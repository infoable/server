const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret_key_09_27";

const TokenGenerateError = require("./errors/TokenGenerateError");
const TokenInvalidError = require("./errors/TokenInvalidError");

function verifyPromisify(token) {
  return new Promise(resolve => {
    jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new TokenInvalidError("만료된 토큰입니다.");
        }
        throw new TokenInvalidError();
      }
      resolve(data);
    });
  });
}
class User {
  constructor() {
    this.currentPage = null;
  }
  async import(token) {
    const data = await verifyPromisify(token);
    this.currentPage = data.currentPage;
  }
  export() {
    return new Promise(resolve => {
      jwt.sign(
        {
          currentPage: this.currentPage
        },
        SECRET_KEY,
        (err, key) => {
          if (err) {
            console.error(err);
            throw new TokenGenerateError();
          }
          resolve(key);
        }
      );
    });
  }
}

module.exports = User;
