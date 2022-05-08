const mongoose = require('mongoose')

const LogModel = new mongoose.Schema({
    actionName: {
        type: String,
        required: true
    },

    timestamp: {
        type: String,
        required: true
    },

    actionResult: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LogModel', LogModel)