const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  contact: String,
  email: String,

  city: String,
  email: {
  type: String,
  required: true
},


  emergency: {
    type: Boolean,
    default: false
  },
  age: {
  type: Number,
  required: true
},


  status: {
    type: String,
    default: "Pending"
  }
  

}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
