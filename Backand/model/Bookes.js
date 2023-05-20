const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    email: String,
    bookName: String,
    authorName: String,
    price: Number,
    publisher: String,
    description: String,
    user_id: {
      type: ObjectId,
      ref: "users",
    },
    // file: file,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const BookesModel = mongoose.model("bookes", BookSchema);

module.exports = BookesModel;
