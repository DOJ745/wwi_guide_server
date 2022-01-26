const mongoose = require('mongoose')

const SurveyQuestion = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        default: 'Type question here'
    },

    img: {
        type: String,
        default: "https://pixy.org/images/placeholder.png"
    },

    eventId: {
        type: String,
        ref: 'Event',
        required: true
    }
})

module.exports = mongoose.model('SurveyQuestion', SurveyQuestion)