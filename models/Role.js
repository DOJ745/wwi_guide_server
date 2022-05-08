const mongoose = require('mongoose')

const Role = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: "USER",
        enum: ["USER", "ADMIN"]
    }
})

module.exports = mongoose.model('Role', Role)