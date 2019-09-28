const mongoose = require("mongoose");
const RequiredNotExist = require("../src/errors/RequiredNotExist");

const actionsSchema = new mongoose.Schema({
  name: String,
  doings: [Object]
});
const schema = new mongoose.Schema({
  site: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  actions: [actionsSchema]
});

schema.pre("save", function(next) {
  if (!this.site || !this.by || !this.name) {
    return next(new RequiredNotExist("API"));
  }
  next();
});

module.exports = mongoose.model("api", schema);
