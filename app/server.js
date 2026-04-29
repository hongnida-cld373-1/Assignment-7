const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("FoodExpress API is running 🚀");
});

app.get("/items", (req, res) => {
  res.send("FoodExpress's Items Page\nItem1\nItem2\Item3...")
});


app.listen(5000, () => {
  console.log("Server running on port 3000");
});