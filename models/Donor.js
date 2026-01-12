const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodGroup: String,
  contact: String,
  city: String,

  // ✅ ADD HERE
  lastDonationDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Donor", donorSchema);
