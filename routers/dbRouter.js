const Router = require('express')
const router = new Router()

const yearController = require('../controllers/YearController')
const countryController = require('../controllers/CountryController')
const rankController = require('../controllers/RankController')

const { check } = require('express-validator')

const roleMiddleware = require('../middleware/roleMiddleware')

// ----- YEARS -----

router.post('/years',
    [
        check('date', 'Date of the year cannot be empty and must be 4 symbols!')
            .notEmpty()
            .isLength({min: 4, max: 4})
    ],
    roleMiddleware(['ADMIN', 'USER']),
    yearController.addElem)

router.get('/years', roleMiddleware(['ADMIN', 'USER']), yearController.getElems)

// ----- RANKS -----

router.get('/ranks', roleMiddleware(['ADMIN', 'USER']), rankController.getElems)
router.post('/ranks', roleMiddleware(['ADMIN', 'USER']), rankController.addElem)

// ----- COUNTRIES -----

router.post('/countries', roleMiddleware(['ADMIN']), countryController.addElem)
router.get('/countries',  countryController.getElems)

module.exports = router