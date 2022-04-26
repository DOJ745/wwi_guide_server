const Router = require('express')
const router = new Router()

router.get("/pug",
    (req, res) => {
    res.render('test')
})
router.get("/carousel", (req, res) => {
    res.render('layouts/carousel')
})

module.exports = router