const mongoose = require('mongoose')

const TestTheme = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 64
    }
})

module.exports = mongoose.model('TestTheme', TestTheme)
