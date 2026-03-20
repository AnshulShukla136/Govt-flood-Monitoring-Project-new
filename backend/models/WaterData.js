const mongoose = require("mongoose");

const WaterSchema = new mongoose.Schema({
  riverName: String,
  location: String,
  waterLevel: Number,
  status: String,
  imagePath: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WaterData", WaterSchema);
