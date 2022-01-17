const Router = require('express')
const router = new Router()
const controller = require('../controllers/AuthController')

router.post('/reg', controller.reg)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router