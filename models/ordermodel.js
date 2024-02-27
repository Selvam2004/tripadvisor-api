const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  placeName: String,
  location:String,
  url:String,
  rating:Number,
  customerName: String,
  customerEmail: String,
  dateOfBooking: {
    type: Date,
    default: Date.now(),
  },
  bookedDate: Date,
  guest: String,
  rooms: Number,
  price: Number,
  slot: String,
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
