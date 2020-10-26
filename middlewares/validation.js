const fs = require('fs')

module.exports = (req, res, next) => {
    if(!req.file) {
        next()
    }
    else {

        if (!(req.file.mimetype).includes('image/jpeg') && !(req.file.mimetype).includes('image/png') && !(req.file.mimetype).includes('image/jpg')) {
            fs.unlinkSync(req.file.path)
            return res.status(400).send('file is not a valid type')
        }
    
        if (req.file.size > 1024 * 1024) {
            fs.unlinkSync(req.file.path)
            return res.status(400).send('file size is large')
        }
        next()
    }
}