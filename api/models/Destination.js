const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      
    },
    imageUrl: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }
}, {timestamps: true});

module.exports = mongoose.model("Destination", DestinationSchema)