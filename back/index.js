//TODO: failed to connect to the existing db, after writing all this code,
//my cluster created another db called test, when I copied to test, all worked

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Sushi = require("./schema");

//.env didn't work as expected
const URI =
  //why not /sushi_finder?
  "mongodb+srv://Cluster97685:SXNkVV5JbnpX@cluster97685.wsz3j.mongodb.net/";
//initiating express
const app = express();
app.use(express.json());

//
const PORT = process.env.PORT || 5000;

//connecting to mongo
mongoose
  //the {} used to have {useNewUrlParser: true, useUnifiedTopology: true} now deprecated
  .connect(URI, {})
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log("Err:", err));

//getting the sushi
app.get("/sushi", async (req, res) => {
  try {
    const sushiList = await Sushi.find();
    res.json(sushiList);
  } catch (err) {
    res.status(500).json({error: "Server Error"});
  }
});

app.listen(PORT, () => {
  console.log(`Sever runing on ${PORT}`);
});
