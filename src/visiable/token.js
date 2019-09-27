const jwt = require("jsonwebtoken");
const SECRET_KEY =
  process.env.SECRET_KEY_VISIABLE ||
  process.env.SECRET_KEY ||
  "secret_key_09_27_1";
const TokenInvalidError = require("../errors/TokenInvalidError");
exports.sign = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

exports.verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, key) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject(new TokenInvalidError("만료된 토큰입니다."));
          return;
        }
        reject(new TokenInvalidError());
        return;
      }
      resolve(key);
    });
  });
};
