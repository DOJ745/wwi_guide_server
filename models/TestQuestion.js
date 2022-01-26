const mongoose = require('mongoose')

const TestQuestion = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        default: 'Type question here'
    },

    img: {
        type: String,
        default: "https://pixy.org/images/placeholder.png"
    }
})

module.exports = mongoose.model('TestQuestion', TestQuestion)