const mongoose = require('mongoose')

const TestAnswer = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: 'Type answer here'
    },

    isTrue: {
        type: Boolean,
        required: true,
        default: true,
        enum: [true, false]
    },

    points: {
        type: Number,
        required: true,
        default: 10,
        min: 0,
        max: 100
    },

    testQuestionId: {
        type: String,
        required: true,
        ref: 'TestQuestion'
    }
})

module.exports = mongoose.model('TestAnswer', TestAnswer)