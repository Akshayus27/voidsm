const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EngraveSchema = new Schema({
    image: {
        type: Buffer
    },
    monkImg: {
        type: Buffer
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    body: {
        type: String,
        default: ''
    },
    handle: {
        type: String
    },
    voteCount: {
        type: Number,
        default: 0
    },
    enlightenCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Engrave', EngraveSchema)