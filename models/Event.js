const mongoose = require('mongoose')

const Event = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: "Something happened"
    },

    images: [{
        type: String
    }],

    surveyId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', Event)