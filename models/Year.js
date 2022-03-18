const mongoose = require('mongoose')

const Year = new mongoose.Schema({
    date: {
        type: Number,
        required: true,
        unique: true
    },

    title: {
        type: String,
        default: "Here we go",
        minLength: 6,
        maxLength: 60,
        required: true
    },

    img: {
        type: String,
        required: true,
        default: "https://pixy.org/images/placeholder.png"
    }
})

module.exports = mongoose.model('Year', Year)