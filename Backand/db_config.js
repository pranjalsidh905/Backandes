const mongoose = require("mongoose");
const connectTODB = () => {
  mongoose
    .connect(
      "mongodb+srv://sidhpranjal905:fGCA8Vx5Mhs1XJiw@pranjal.xpskej1.mongodb.net/Book_store?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected"));

  mongoose.connection.on("error", (error) => {
    console.error(error);
  });
};

module.exports = {
  connectTODB,
};
