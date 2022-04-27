const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.get("test-page",
    (req, res) => {
    res.render('test')
})
router.get("/", (req, res) => {
    res.render('auth/log_in')
})
router.get("/home", roleMiddleware(['ADMIN']), (req, res) =>{
    res.render('home')
})

module.exports = router