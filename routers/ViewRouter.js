const Router = require('express')
const router = new Router()

router.get("/test-page",
    (req, res) => {
    res.render('test')
})
router.get("/log-in", (req, res) => {
    res.render('log_in')
})

module.exports = router