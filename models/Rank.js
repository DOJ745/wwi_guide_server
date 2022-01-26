const mongoose = require('mongoose')

const Rank = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        default: "Private"
    },

    points: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 1000
    },

    img: {
        type: String,
        required: true,
        default: "https://pixy.org/images/placeholder.png"
    },

    countryId: {
        type: String,
        ref: 'Country'
    }
})

module.exports = mongoose.model('Rank', Rank)