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

    eventId:[{
        type: String,
        ref: 'Event',
        default: null
    }],

    armamentId: [{
        type: String,
        ref: 'Armament',
        default: null
    }],

    achievementId: {
        type: String,
        ref: 'Achievement',
        required: true
    }
})

module.exports = mongoose.model('SurveyQuestion', SurveyQuestion)