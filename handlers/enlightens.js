const Enlighten = require('../models/enlightens')
const Engrave = require('../models/engraves')
const Monk = require('../models/monks')

exports.getEnlightens = async function(req, res) {
    const enlites = await Enlighten.find({engraveId: req.params.id})
    
    if(enlites) res.send(enlites)
}

exports.enlightenThem = async function(req, res, next) {
    if(!req.body.body) return res.sendStatus(400)

    const engs = await Engrave.findOne({_id: req.params.id})
    if(!engs) return res.sendStatus(400)

    const monk = await Monk.findOne({_id: req.monk._id})
    const enlite = new Enlighten({
        body: req.body.body,
        engraveId: req.params.id,
        handle: monk.handle,
        image: monk.image
    })

    const count = await Enlighten.find({engraveId: req.params.id})
    await Engrave.findOneAndUpdate({_id: req.params.id}, {enlightenCount: count.length + 1}, (err) => {
        if(err) return res.sendStatus(400)
    })

    enlite.save((err,data) => {
        if(err) return res.sendStatus(400)
        console.log(data)
        res.send(data)
    })
    next()
}

exports.unEnlightenThem = async function(req, res) {
    const monk = await Monk.findOne({_id: req.monk._id})

    const count = await Enlighten.find({engraveId: req.params.id})
    await Engrave.findOneAndUpdate({_id: req.params.id}, {enlightenCount: count.length - 1}, (err) => {
        if(err) return res.sendStatus(400)
    })

    await Enlighten.findOneAndRemove({engraveId: req.params.id, handle: monk.handle}, (err) => {
        if(err) return res.sendStatus(400)
    })

    const enlites = await Enlighten.find({engraveId: req.params.id})  
    if(enlites) res.send(enlites)
}