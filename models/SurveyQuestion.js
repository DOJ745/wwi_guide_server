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

    itemId: {
        type: String,
        ref: 'Event',
        required: true,
        default: null
    }

    /*armamentId: {
        type: String,
        ref: 'Armament',
        default: null
    }*/
})

module.exports = mongoose.model('SurveyQuestion', SurveyQuestion)