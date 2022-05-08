const mongoose = require('mongoose')

const Armament = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Armament name",
        minLength: 3
    },

    text: {
        type: String,
        required: true,
        default: "Something about weapon or technique"
    },

    images: [{
        type: String,
        default: "https://pixy.org/images/placeholder.png"
    }],

    category:  {
        type: String,
        required: true,
        enum : ['weapon','technique'],
        default: 'weapon'
    }
})
module.exports = mongoose.model('Armament', Armament)