const mongoose = require('mongoose')

const Survey = new mongoose.Schema({
    question_text: {
        type: String,
        required: true,
        default: 'Type question here'
    },

    img: {
        type: String,
        default: null
    },

    answer_variants:[{
        type: String,
        default: ["Да", "Нет"]
    }],

    points: {
        type: Number,
        default: 5,
        min: 0,
        max: 10
    }
})

module.exports = mongoose.model('Survey', Survey)