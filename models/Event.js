const mongoose = require('mongoose')

const Event = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: "Event name"
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

    yearId: {
        type: String,
        ref: 'Year',
        required: true
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

module.exports = mongoose.model('Event', Event)