const mongoose = require('mongoose')

const TestQuestion = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: 'Type question here'
    },

    testThemeId: {
        type: String,
        required: true,
        ref: 'TestTheme'
    },

    img: {
        type: String,
        default: null //"https://pixy.org/images/placeholder.png"
    }
})

module.exports = mongoose.model('TestQuestion', TestQuestion)