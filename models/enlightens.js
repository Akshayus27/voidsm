const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnlightenSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    body: {
        type: String,
        required: true
    },
    handle: {
        type: String
    },
    engraveId: {
        type: String
    },
    image: {
        type: Buffer
    }
})

module.exports = mongoose.model('Enlighten', EnlightenSchema)