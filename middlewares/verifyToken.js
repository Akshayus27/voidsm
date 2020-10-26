const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('AuthToken')
    if(!token) return res.status(400).send('Access denied')

    try {
        const verified = jwt.verify(token, 'monk-login')
        req.monk = verified;
        next()
    }
    catch(err) {
        res.status(400).send('Invalid token')
    }
}