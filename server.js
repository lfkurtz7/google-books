require('dotenv').config();

console.log(process.env.GOOGLE_BOOKS_API)
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
var routes = require('./routes')
app.use(routes)

const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
