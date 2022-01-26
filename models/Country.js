const mongoose = require('mongoose')

const Country = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "France"
    },

    img: {
        type: String,
        required: true,
        default: "https://pixy.org/images/placeholder.png"
    }
})

module.exports = mongoose.model('Country', Country)