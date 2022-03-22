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
        default: 0,
        required: true
    },

    rankId: {
        type: String,
        ref: 'Rank',
        required: true
    },

    achievements: [{
        type: String,
        ref: 'Achievement'
    }],

    country: {
        type: String,
        ref: 'Country',
        required: true
    }
})

module.exports = mongoose.model('User', User)