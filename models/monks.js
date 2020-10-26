const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonkSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    handle: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Monk', MonkSchema)