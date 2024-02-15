const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/usemodels");
const PORT=process.env.PORT ||3001;
const app = express();
app.use(cors({
  origin:["http://localhost:3000","https://trip-advisor-phi.vercel.app"],
  methods:["GET","POST"],
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

 const uri='mongodb+srv://selvam:Selvam2004@cluster0.d5cbf3s.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(uri);

app.post("/register", (req, res) => {
   const {name,email,password}=req.body;
   bcrypt.hash(password,10)
   .then(hash=>{
      UserModel.create({name,email,password:hash})
     .then((user) => res.json({status:"OK"}))
     .catch((err) => res.json(err));
   })
   .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password,user.password,(err,response)=>{
          if(response){
            const token =jwt.sign({email:user.email,role:user.role},"safety-key-admin",{expiresIn:'1d'});
            res.cookie('token',token); 
            return res.json({status:"success",role:user.role});
          }
          else {
          res.json("*Password incorrect");
        }
        });
      } 
      else {
        res.json("*User is not registered"); 
      }
    })
    .catch((err) => res.json(err));
});

const verifyadmin =(req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.json("token is missing");
  }
  else{
    jwt.verify(token,"safety-key-admin",(err,decoded)=>{
      if(err){
        return res.json("Error");
      }
      else{
        if(decoded.role=="admin"){
          next();
        }
        else{
          return res.json("user");
        }
      }
    })
  }
}

app.get("/dashboard",verifyadmin,(req,res)=>{
  res.json("success");
});


app.listen(PORT, () => {
  console.log("app is listening ");
});
