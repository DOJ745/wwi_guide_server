const mongoose = require('mongoose')

const User = new mongoose.Schema({

    login: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 48
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
        required: true,
        default: '62388a35efcd519f16afdb7e' // Рядовой (Российская империя)
    },

    achievements: [{
        type: String,
        ref: 'Achievement'
    }],

    countryId: {
        type: String,
        ref: 'Country',
        required: true,
        default: '61f987b85d289d4cb3c483aa' // Российская империя
    }
})

module.exports = mongoose.model('User', User)