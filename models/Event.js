const mongoose = require('mongoose')

const Event = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: "Event name"
    },

    text: {
        type: String,
        required: true,
        default: "Something happened"
    },

    images: [{
        type: String,
        min: 1,
        default: "https://pixy.org/images/placeholder.png"
    }],

    yearId: {
        type: String,
        ref: 'Year',
        required: true
    }
})

module.exports = mongoose.model('Event', Event)