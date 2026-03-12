const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },

  wardNumber: {
    type: Number
  },

  city: {
    type: String,
    default: "Pune"
  }

}, { timestamps: true });

const areaData = mongoose.model("Area", areaSchema);

module.exports = areaData;

