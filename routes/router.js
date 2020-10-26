const router = require('express').Router()
const engrave = require('../handlers/engraves')
const monk = require('../handlers/monks')
const enlighten = require('../handlers/enlightens')
const vote = require('../handlers/votes')
const notification = require('../handlers/notifications')
const verify = require('../middlewares/verifyToken')
const uploads = require('../middlewares/upload')
const validation = require('../middlewares/validation')

router.get('/engrave', engrave.feeds)
router.post('/engrave/create', verify, validation, uploads, engrave.create)
router.get('/engrave/:id', engrave.getEngrave)
router.delete('/engrave/:id/delete', verify, engrave.delEngrave)

router.post('/sign-up', validation, uploads, monk.signUp)
router.post('/login', monk.login)
router.put('/monk/dp', verify, validation, uploads, monk.updateDP)
router.put('/monk/update', verify, monk.updateDetails)
router.get('/monk', verify, monk.getCreds)
router.get('/monk/:handle', verify, monk.getCreds)
router.get('/monk/:handle/engraves', verify, monk.getEngraves)

router.post('/engrave/:id/enlighten', verify, enlighten.enlightenThem, notification.notifyEnlighten)
router.get('/engrave/:id/enlightens', verify, enlighten.getEnlightens)
router.delete('/engrave/:id/unenlighten', verify, enlighten.unEnlightenThem)
router.get('/engrave/:id/vote', verify, vote.voteThem, notification.notifyVote)

router.get('/notification', verify, notification.getNotifications)
router.post('/notification/:id', verify, notification.markNotifications)


module.exports = router