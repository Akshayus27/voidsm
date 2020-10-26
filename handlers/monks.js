const Monk = require('../models/monks')
const Engrave = require('../models/engraves')
const Enlighten = require('../models/enlightens')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const schema = {
    sign_up: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        handle: Joi.string().min(3).required()
    }),
    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

exports.signUp = async function(req, res) {
    const { error } = schema.sign_up.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let mon =  await Monk.findOne({email: req.body.email})
    if(mon) return res.status(400).send('"email" already exists')

    mon =  await Monk.findOne({handle: req.body.handle})
    if(mon) return res.status(400).send('"handle" already exists')

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    let monk = new Monk({
        email: req.body.email,
        password: password,
        handle: req.body.handle,
        image: fs.readFileSync(path.join(__dirname + '/images/' + 'no-img.png'))
    })
    const token = jwt.sign({_id: monk._id}, 'monk-login')
    res.header('AuthToken', token)

    monk.save(err => {
        if(err) return res.sendStatus(400)
        res.status(200).send(token)
    })
    
}

exports.getCreds = async function(req, res) {
    let monk
    if(req.params.handle){
        monk = await Monk.findOne({handle: req.params.handle})
    }else{
        monk = await Monk.findOne({_id: req.monk._id})
    }
    res.send(monk)
}

exports.getEngraves = async function(req, res) {
    const feeds = await Engrave.find({handle: req.params.handle})

    res.send(feeds)
}

exports.updateDP = async function(req, res) {
    let monk = await Monk.findOne({_id: req.monk._id})

    let i = fs.readFileSync(path.join(req.file.path))
    
    if(monk && req.file.path) {
        await Monk.findOneAndUpdate({_id: monk._id}, {image: i})
    }

    const engs = await Engrave.find({handle: monk.handle})
    for(let eng of engs) {
        await Engrave.findOneAndUpdate({_id: eng._id}, {monkImg: i})
    }

    const enlites = await Enlighten.find({handle: monk.handle})
    for(let enlite of enlites) {
        await Enlighten.findOneAndUpdate({_id: enlite._id}, {image: i})
    }
}

exports.updateDetails = async function(req, res) {
    let monk = await Monk.findOne({_id: req.monk._id})
    
    if(monk) {
        await Monk.findOneAndUpdate(
                {_id: monk._id}, 
                {
                email: monk.email,
                handle: monk.handle,
                createdAt: monk.createdAt,
                password: monk.password,
                image: monk.image,
                bio: req.body.bio ? req.body.bio : '',
                location: req.body.location ? req.body.location : ''
                }, 
                (err) => {
            if(err) return res.sendStatus(400)
            res.sendStatus(200)
        })
    }
}

exports.login = async function(req, res) {
    const { error } = schema.login.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const monk = await Monk.findOne({email: req.body.email})
    if(monk) {
        const validPwd = await bcrypt.compare(req.body.password, monk.password)

        if(!validPwd) return res.status(400).send('"password" is incorrect')
        
        const token = jwt.sign({_id: monk._id}, 'monk-login')
        res.header('AuthToken', token).status(200).send(token)
    }
    else{
        res.status(400).send('"email" address is invalid')
    }
}