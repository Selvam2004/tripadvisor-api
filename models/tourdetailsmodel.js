const mongoose = require("mongoose");

const TourDetailsSchema = new mongoose.Schema({ 
    imgsrc:String, 
    location:String,
    head:[String],
    content:[
        {
            place:String,
            imagesrc:String,
            discription:String,
            time:String,
            fee:String,
            mapLink:String
        }
    ],
    hospitality:[
        {
            place:String,
            imagesrc:String,
            address:String,
            opening:String,
            number:String,
            mapLink:String
        }
    ],
    images:[String],
    about:[String],
    key:String
})

const TourDetailsModel = mongoose.model('TourDetails',TourDetailsSchema);
module.exports=TourDetailsModel;