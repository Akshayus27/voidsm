const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    recipient: {
        type: String
    },
    sender: {
        type: String
    },
    engraveId: {
        type: String
    },
    type: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Notification', NotificationSchema)