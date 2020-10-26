const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteSchema = new Schema({
    handle: {
        type: String
    },
    engraveId: {
        type: String
    }
})

module.exports = mongoose.model('Vote', VoteSchema)