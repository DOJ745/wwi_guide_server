const mongoose = require('mongoose')

const SurveyAnswer = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: 'Type answer here'
    },

    surveyQuestionId: {
        type: String,
        required: true,
        ref: 'SurveyQuestion'
    }
})

module.exports = mongoose.model('SurveyAnswer', SurveyAnswer)