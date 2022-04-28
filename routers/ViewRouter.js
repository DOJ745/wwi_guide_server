const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.get("test-page",
    (req, res) => {
    res.render('test')
})
router.get("/", (req, res) => {
    if(req.cookies.access_token)
        res.redirect('/home')
    else res.render('auth/sign_in')
})
router.get("/reg", (req, res) => {
    res.render('auth/sign_up')
})
router.get("/home", roleMiddleware(['ADMIN']), (req, res) =>{
    res.render('home')
})

module.exports = router