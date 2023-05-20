const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserDataSchema = new Schema({
  name: String,
  email: String,
  address: String,
  phoneno: Number,
  age: Number,
  usertype: String,
});
const UserDataModel = mongoose.model("UserData", UserDataSchema);
module.exports = UserDataModel;
