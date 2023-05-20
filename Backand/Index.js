const express = require("express");
const cors = require("cors");
const { connectTODB } = require("./db_config");
const app = express();
const port = 8008;
connectTODB();
const bodyParser = require("body-parser");
// const UserModel = require("./model/Uesr");
const BookesModel = require("./model/Bookes");
const PhonesModel = require("./model/Phonees");
const UserDataModel = require("./model/UserData");
const UserModel = require("./model/Uesr");
const LoginModel = require("./model/Login");
const { generateToken, auth } = require("./Meddleware");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/user", (req, res) => res.send("beta"));

app.post("/add-book", async (req, res) => {
  const { email, bookName, authorname, price, description } = req.body;
  console.log(">>>>>>>>>>>>>", req.body);

  const bookes = await BookesModel.create({
    email,
    bookName,
    authorName: authorname,
    price,
    description,
  });
  console.log(">>>>>>>>>>>>>>>>>>>", bookes);
  res.send({ message: "Book added Successfull", success: true });
});
app.get("/getbooks", async function (req, res) {
  // const allBooks = await BookesModel.find();
  const allBooks = await BookesModel.aggregate([{ $sort: { created_at: -1 } }]);
  console.log(">>>>>>>>>>>>>>>>>>>allBooks", allBooks);
  res.send({ sucess: true, message: "book found", allBooks });
});

app.post("/add-phone", async (req, res) => {
  const {
    email,
    phonename,
    phonecompany,
    phonemodel,
    phoneprice,
    phonecolor,
    phonesize,
  } = req.body;
  console.log(">>>>>>>>>>>>>", req.body);
  const phones = await PhonesModel.create({
    email,
    phonename,
    phonecompany,
    phonemodel,
    phoneprice,
    phonecolor,
    phonesize,
  });
  console.log(">>>>>>>>>>>>>>>>>>>", phones);
  res.send("Phone Successfull");
});
app.get("/getphones", async function (req, res) {
  const allPhones = await PhonesModel.find();
  console.log(">>>>>>>>>>>>>>>>>>>>>>allPhones", allPhones);
  res.send({ sucess: true, message: "phone found", allPhones });
});

const getAllPhoneData = async (req, res) => {
  console.log(">>>>>>>>>>>>>req", req.body);

  const limit = req.body.limit;
  const skip = req.body.page_no * limit;

  console.log(">>>>>>>>>>>>>>>>limit", limit);
  console.log(">>>>>>>>>>>>>>>>skip", skip);

  const userdata = await PhonesModel.aggregate([
    { $match: { phonecompany: "apple" } },
    // {$group:{_id: "$age", name:{$push:"$Pranjal sharma"}}},

    { $sort: { phoneprice: -1 } },

    { $skip: skip },
    { $limit: limit },
  ]);
  console.log(">>>>>>>>>>>>>>>>>>>>>", userdata.length);
  res.send({ sucess: true, message: "user found", userdata });
};
app.post("/getuser", auth, getAllPhoneData);

app.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    usertype,
    phone,
    address,
    pincode,
    city,
    state,
    country,
  } = req.body;
  console.log(">>>>>>>>>>>>>>>", req.body);
  const user = await UserModel.create({
    name,
    email,
    password,
    age,
    usertype,
    phone,
    address,
    pincode,
    city,
    state,
    country,
  });

  console.log("============", user);

  const signupdata = req.data;
  console.log("=======>", signupdata);

  res.send({ message: "sign-up successfull", success: true, data: user });
});
// app.get("/getdata", async (req, res) => {
//   const data = await UserModel.find();
//   console.log(">>>>>>>>>>>>>>>>", data);
//   res.send({ sucess: true, message: "data found", data });
// });

app.post("/addbook", auth, async (req, res) => {
  const { BookName, AuthorName, Description, Price } = req.body;
  console.log("req.body>>>>>>>>>>>>>>>", req.body);
  const book = await BookesModel.create({
    BookName,
    AuthorName,
    Price,
    Description,
  });
  console.log("============", book);
  res.send("book added successfully");
});

const onlogin = async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>req.body", req.body);
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  console.log(">>>>>>>>>>>>>>>>>>>>>>user", user);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>password", password);
  if (user) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>user.password", user.password);
    console.log(">>>>>>>>>>>>>>>>>>>>>>user.password", user.email);
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>user.password",
      user.password === password
    );
    if (user.password === password) {
      const token = await generateToken(user);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>token", token);
      res.send({
        success: true,
        message: "login successfull",
        data: {
          user,
          token,
        },
      });
    } else {
      res.send({ success: false, message: "invalid password" });
    }
  } else {
    res.send({ success: false, message: "no user found" });
  }
};
app.post("/login", onlogin);
// async (req, res) => {
//   const { email, password } = req.body;

//   console.log("req.body ==========", req.body);
//   const Login = await LoginModel.create({
//     email,
//     password,
//   });
//   console.log("========", Login);
//   // const logindata = req.data;
//   // console.log("======>", logindata);
//   res.send("login added successfully");
// });
app.listen(port, () => console.log(`server is running on ${port} port`));
