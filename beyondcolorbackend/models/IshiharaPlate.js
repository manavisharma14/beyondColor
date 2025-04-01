const mongoose = require("mongoose");

const IshiharaPlateSchema = new mongoose.Schema({
  plate_id: { type: Number, required: true, unique: true }, // Plate number
  image_url: { type: String, required: false }, // Image URL (local/public)
  correct_answer: { type: String, required: true }, // Normal vision answer
  red_green_deficiency_answer: { type: String, default: null }, // Protanopia/Deuteranopia
  deuteranopia_protanopia_answer: { type: String, default: null }, // Separate answer if needed
  options: { type: [String], required: true }, // Answer choices
  description: { type: String, required: true } // Explanation for each plate
});

module.exports = mongoose.model("IshiharaPlate", IshiharaPlateSchema);
