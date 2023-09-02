"use strict";

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  destinations: [{
    type: mongoose.Types.ObjectId,
    ref: 'Destination'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("User", UserSchema);