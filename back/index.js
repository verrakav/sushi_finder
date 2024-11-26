//.env didn't work as expected
require("dotenv").config();
const express = require("express");
const cors = require("cors");
//db related
const mongoose = require("mongoose");
const Sushi = require("./schema");

//initiating express
const app = express();

//enabling front- and backend to communicate
app.use(cors());
//auto-parses JSON from request body into a JS obj
app.use(express.json());

//
const PORT = process.env.PORT || 5000;
//why process.env... is undefined?
const URI = process.env.MONGO_URI;
//connecting to mongodb
mongoose
  //the {} used to have {useNewUrlParser: true, useUnifiedTopology: true} now deprecated
  .connect(URI, {})
  .then(() =>
    console.log("connected to MongoDB", mongoose.connection.db.databaseName)
  )
  .catch(err => console.log("Err:", err));

//getting sushi
app.get("/sushi", async (req, res) => {
  const {ingredients, calories} = req.query;

  try {
    //query for MongoDB
    const query = {};

    if (ingredients) {
      //recieving a str from the front => convert into arr
      const ingredientsArr = ingredients.split(",").map(i => i.trim());
      //populating the query obj
      query.ingredients = {$all: ingredientsArr};
    }

    //condition for calories
    if (calories) {
      const caloriesNum = Number(calories);
      query.calories = {$lte: caloriesNum};
    }

    const sushiList = await Sushi.find(query);
    res.json(sushiList);
  } catch (err) {
    res.status(500).json({error: "Server Error"});
  }
});

app.listen(PORT, () => {
  console.log(`Sever runing on ${PORT}`);
});

//TODO:
//fix the case for lowercase ingred
//
