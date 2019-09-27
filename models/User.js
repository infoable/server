const mongoose = require("mongoose");
const password = require("../src/lib/password");
const RequiredNotExist = require("../src/errors/RequiredNotExist");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    set(v) {
      return password(v);
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

schema.pre("save", function(next) {
  if (!this.email) {
    throw new RequiredNotExist("이메일");
  }
  if (!this.password) {
    throw new RequiredNotExist("패스워드");
  }
  if (!this.username) {
    throw new RequiredNotExist("유저 이름");
  }
  next();
});

module.exports = mongoose.model("user", schema);
