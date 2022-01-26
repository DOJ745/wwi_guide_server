const mongoose = require('mongoose')

const Achievement = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        default: 'Achievement 1',
        minLength: 3,
        maxLength: 128
    },

    description: {
        type: String,
        required: true,
        default: 'Accomplish something'
    },

    points: {
        type: Number,
        required: true,
        default: 30,
        min: 30,
        max: 100
    },

    img: {
        type: String,
        required: true,
        default: "https://pixy.org/images/placeholder.png"
    }
})

module.exports = mongoose.model('Achievement', Achievement)