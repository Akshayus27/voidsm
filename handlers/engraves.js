const Engrave = require('../models/engraves')
const Enlighten = require('../models/enlightens')
const Vote = require('../models/votes')
const Monk = require('../models/monks')
const path = require('path')
const fs = require('fs')

exports.feeds = async function(req, res) {
    await Engrave.find({}, null, {sort: { createdAt: -1}}, (err, engs) => {
        if(err) return res.sendStatus(400)

        res.send(engs)
    })
}

exports.create = async function(req, res) {
    if(req.body.body === '' || req.body.image) return res.status(400).send('Body cant be empty')
    
    const mon = await Monk.findOne({_id: req.monk._id})

    let i = req.file ? fs.readFileSync(path.join(req.file.path)) : null
    const engs = new Engrave({
        body: req.body.body ? req.body.body : '',
        handle: mon.handle,
        createdAt: Date.now(),
        monkImg: mon.image,
        image: i
    })
    engs.save((err, data) => {
        if(err) return res.sendStatus(400)
        
        res.send(data)
    })
}

exports.getEngrave = async function(req, res) {
    const engs = await Engrave.findOne({_id: req.params.id})
    if(engs.length === 0) return res.sendStatus(400)

    res.send(engs)
}

exports.delEngrave = async function(req, res) {
    const engs = await Engrave.findOne({_id: req.params.id})
    if(!engs) return res.sendStatus(400)

    
    await Vote.findOneAndRemove({engraveId: req.params.id}, (err) => {
        if(err) return
    })

    await Enlighten.findOneAndRemove({engraveId: req.params.id}, (err) => {
        if(err) return
    })

    await Engrave.findOneAndRemove({_id: engs._id}, (err) => {
        if(err) return res.sendStatus(400)

        return res.sendStatus(200)
    })
}