const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, path.join(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter})

module.exports = upload.single('image')