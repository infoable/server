const mongoose = require("mongoose");
const RequiredNotExist = require("../src/errors/RequiredNotExist");

const schema = new mongoose.Schema({
  site: {
    type: String,
    required: true
  },
  by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  actions: {
    type: Array
  }
});

schema.pre("save", function(next) {
  if (!this.site || !this.by) {
    return next(new RequiredNotExist("API"));
  }
  next();
});

module.exports = mongoose.model("api", schema);
