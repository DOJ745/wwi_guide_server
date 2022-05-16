const mongoose = require('mongoose')

const Armament = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Armament name",
        minLength: 3
    },

    text_paragraphs: [{
        type: String,
        required: true,
        default: ["<p>some text</p>", "<p>some text</p>"]
    }],

    images: [{
        type: String,
        required: true,
        default: ["link", "link"]
    }],

    images_titles: [{
        type: String,
        required: true,
        default: ["title", "title"]
    }],

    category:  {
        type: String,
        required: true,
        enum : ["weapon", "technique"],
        default: "weapon"
    },

    subcategory: {
        type: String,
        required: true,
        enum : ["ground", "aviation", "navy"],
        default: null
    },

    achievementId: {
        type: String,
        ref: 'Achievement',
        required: true
    },

    surveyId: {
        type: String,
        ref: 'Survey',
        required: true
    }
})
module.exports = mongoose.model('Armament', Armament)