const mongoose = require("mongoose");

//defining the schema
const sushiSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  ingredients: [String],
  calories: Number
});

module.exports = mongoose.model("Sushi", sushiSchema);
