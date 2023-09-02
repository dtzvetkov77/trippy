"use strict";

var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var cors = require('cors');
var authRoute = require("./routes/auth");
var destinationRoute = require("./routes/destination");
app.use(express.json());
dotenv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to DB'))["catch"](function (err) {
  return console.log(err);
})["catch"](function (err) {
  return console.log(err);
});
app.use("/api/auth", authRoute);
app.use('/api/destinations', destinationRoute);
app.listen('5001', function () {
  return console.log('Server is running on port 5001...');
});