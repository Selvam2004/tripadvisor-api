const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const UserModel = require("./models/usemodels");
const tourModel = require("./models/toursmodel");
const TourDetailsModel = require("./models/tourdetailsmodel");
const HotelModel = require("./models/hotelmodel");
const RestaurentModel = require("./models/restaurentmodel");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://trip-advisor-phi.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri =
  "mongodb+srv://selvam:Selvam2004@cluster0.d5cbf3s.mongodb.net/user?retryWrites=true&w=majority";

mongoose.connect(uri);

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json({ status: "OK" }))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "safety-key-admin",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ status: "success", role: user.role });
          } else {
            res.json("*Password incorrect");
          }
        });
      } else {
        res.json("*User is not registered");
      }
    })
    .catch((err) => res.json(err));
});

const verifyadmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("token is missing");
  } else {
    jwt.verify(token, "safety-key-admin", (err, decoded) => {
      if (err) {
        return res.json("Error");
      } else {
        if (decoded.role == "admin") {
          next();
        } else {
          return res.json("user");
        }
      }
    });
  }
};

app.get("/dashboard", verifyadmin, (req, res) => {
  res.json("success");
});

app.get("/",(req,res)=>{{
  res.json("hello")
}})

app.post("/addtour", (req, res) => {
  tourModel
    .create(req.body)
    .then((tour) => res.json({ status: "OK" }))
    .catch((err) => res.json(err));
});

app.get("/alltours", (req, res) => {
  tourModel
    .find()
    .then((tours) => {
      res.json(tours);
    })
    .catch((err) => res.json(err));
});

app.post("/addTourDetails", (req, res) => {
  TourDetailsModel.create(req.body)
    .then((details) => res.json({ status: "OK" }))
    .catch((err) => res.json(err));
});

app.get("/TourDetails/:id", (req, res) => {
  const key = req.params.id;
  TourDetailsModel.findOne({ key: key })
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
});

app.post("/addHotel", (req, res) => {
  HotelModel.create(req.body)
    .then((details) => res.json({ status: "OK" }))
    .catch((err) => res.json(err));
});

app.get("/Hotels", (req, res) => {
  HotelModel.find()
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
});

app.get("/hotel/:id", (req, res) => {
  const key = req.params.id;
  HotelModel.findOne({ title: key })
    .then((hotel) => res.json(hotel))
    .catch((err) => res.json(err));
});

app.post("/addRestaurent", (req, res) => {
  RestaurentModel.create(req.body)
    .then((details) => res.json({ status: "OK" }))
    .catch((err) => res.json(err));
});

app.get("/Restaurents", (req, res) => {
  RestaurentModel.find()
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
});

app.get("/restaurent/:id", (req, res) => {
  const key = req.params.id;
  RestaurentModel.findOne({ title: key })
    .then((restaurent) => res.json(restaurent))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log("app is listening ");
});
