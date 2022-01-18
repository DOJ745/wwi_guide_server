const mongoose = require('mongoose')

const User = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        type: String,
        ref: 'Role'
    }]

    /*
    score: {
        type: Number
    },

    rankId: {
        type: String
    },

    achievements: [{
        type: Number
    }]*/
})

module.exports = mongoose.model('User', User)