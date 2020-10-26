const Vote = require('../models/votes')
const Engrave = require('../models/engraves')
const Monk = require('../models/monks')

exports.voteThem = async function (req, res, next) {
    
    const engs = await Engrave.findOne({ _id: req.params.id })
    if (!engs) return res.sendStatus(400)

    const mon = await Monk.findOne({ _id: req.monk._id })

    const exist = await Vote.findOne({ handle: mon.handle, engraveId: req.params.id })
    const count = await Vote.find({ engraveId: req.params.id })
    if (!exist) {
        await Engrave.findOneAndUpdate({ _id: req.params.id }, { voteCount: count.length + 1 }, (err) => {
            if (err) return res.sendStatus(400)
        })

        const vote = new Vote({
            engraveId: req.params.id,
            handle: mon.handle
        })

        vote.save((err, vote) => {
            if (err) return res.sendStatus(400)
            res.send(vote)
        })
    }
    else {
        await Engrave.findOneAndUpdate({ _id: req.params.id }, { voteCount: count.length - 1 }, (err) => {
            if (err) return res.sendStatus(400)
        })

        await Vote.findOneAndDelete({ handle: mon.handle, engraveId: req.params.id }, (err, vote) => {
            if (err) return res.sendStatus(400)
            res.send(vote)
        })
    }
    next()
}