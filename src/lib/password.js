const crypto = require("crypto");
const SALT = process.env.SALT || "salt";
function password(pw) {
  return crypto.pbkdf2Sync(pw, SALT, 100000, 64, "sha512").toString("base64");
}

module.exports = password;
