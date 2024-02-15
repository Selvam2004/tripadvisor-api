const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  role:{
    type:String,
    default:"user"
  }
});

const UserModel=mongoose.model('user',userSchema);

module.exports=UserModel;