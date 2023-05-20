const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  email: String,
  phonename: String,
  phonecompany: String,
  phonemodel: Number,
  phoneprice: Number,
  phonecolor: String,
  phonesize: Number,
});
const PhonesModel = mongoose.model("phones", PhoneSchema);
module.exports = PhonesModel;
