const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});
const LoginModel = mongoose.model("logins", LoginSchema);
module.exports = LoginModel;
