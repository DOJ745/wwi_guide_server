const mongoose = require('mongoose')

const SurveyAnswer = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: 'Type answer here'
    },

    isTrue: {
        type: Boolean,
        required: true,
        default: true
    },

    points: {
        type: Number,
        required: true,
        default: 10,
        min: 10,
        max: 100
    },

    surveyQuestionId: {
        type: String,
        required: true,
        ref: 'SurveyQuestion'
    }
})

module.exports = mongoose.model('SurveyAnswer', SurveyAnswer)