const mongoose = require("mongoose");
const password = require("../src/lib/password");
const RequiredNotExist = require("../src/errors/RequiredNotExist");
const UniqueError = require("../src/errors/UniqueError");

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
schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new UniqueError("사용자"));
    return;
  }
  next();
});
schema.methods.verifyPassword = function(pw) {
  if (this.password !== password(pw)) {
    return false;
  }
  return true;
};

module.exports = mongoose.model("user", schema);
