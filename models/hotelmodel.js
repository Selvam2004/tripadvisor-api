const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    img:String,
    title:String,
    key:String,
    location:String,
    rating:Number,
    price:Number,
    originalprice:Number,
    discount:Number,
    guest:Number,
    avail:[
        {
            icon:String,
            description:String
        }
    ], 
    imgarr:[String]
});

const HotelModel = mongoose.model('hotels',HotelSchema);
module.exports=HotelModel;