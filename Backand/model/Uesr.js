const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    usertype: String,
    phone: Number,
    address: String,
    pincode: Number,
    city: String,
    state: String,
    country: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
