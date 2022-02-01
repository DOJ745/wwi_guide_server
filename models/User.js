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
        ref: 'Role',
        required: true
    }],

    score: {
        type: Number,
        default: 0
    },

    rankId: {
        type: String,
        ref: 'Rank'
    },

    achievements: [{
        type: String,
        ref: 'Achievement'
    }],

    country: {
        type: String,
        ref: 'Country'
    }
})

module.exports = mongoose.model('User', User)