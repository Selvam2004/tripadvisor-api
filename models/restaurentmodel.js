const mongoose = require('mongoose');

const RestaurentSchema = new mongoose.Schema({
    img:String,
    title:String,
    location:String,
    key:String,    
    rating:Number,
    price:Number,
    offer:String,  
    imgarr:[String],
    map:String
});

const RestaurentModel = mongoose.model('restaurents',RestaurentSchema);
module.exports=RestaurentModel;