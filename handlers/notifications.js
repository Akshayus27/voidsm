const Notification = require('../models/notifications')
const Monk = require('../models/monks')
const Engrave = require('../models/engraves')
const Enlighten = require('../models/enlightens')
const Vote = require('../models/votes')

exports.getNotifications = async function (req, res) {
    const monk = await Monk.findOne({_id: req.monk._id})
    const notify = await Notification.find({ recipient: monk.handle, read: false }, null, { sort: { createdAt: 1 } })
    
    res.send(notify)
}

exports.markNotifications = async function (req, res) {
    let ids = req.params.id.split(',')

    for(let id of ids) {
        await Notification.findByIdAndUpdate(id, { read: true })
    }
    const monk = await Monk.findOne({_id: req.monk._id})
    const marked = await Notification.find({recipient: monk.handle})
    res.send(marked)
}

exports.notifyVote = async function (req, res) {
    const engs = await Engrave.findOne({ _id: req.params.id })
    if (!engs) return 

    const monk = await Monk.findOne({ _id: req.monk._id })
    if (!engs) return 

    const vote = await Vote.findOne({ handle: monk.handle, engraveId: req.params.id })
    if (!vote) return 

    const notify = new Notification({
        engraveId: req.params.id,
        sender: vote.handle,
        recipient: engs.handle,
        type: 'vote'
    })

    notify.save(err => {
        if (err) return 
    })
}

exports.notifyEnlighten = async function (req, res) {
    const engs = await Engrave.findOne({ _id: req.params.id })
    if (!engs) return

    const monk = await Monk.findOne({ _id: req.monk._id })
    if (!engs) return

    const notify = new Notification({
        engraveId: req.params.id,
        sender: monk.handle,
        recipient: engs.handle,
        type: 'enlighten'
    })

    notify.save(err => {
        if (err) return 
    })
}