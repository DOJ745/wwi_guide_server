const Router = require('express')
const router = new Router()
const yearController = require('../controllers/YearController')
const countryController = require('../controllers/CountryController')
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
    yearController.addYear)

router.get('/years', roleMiddleware(['ADMIN', 'USER']), yearController.getYears)

// ----- COUNTRIES -----

//router.get('/countries', roleMiddleware(['ADMIN', 'USER']), countryController.getCountries)
router.post('/countries', countryController.addCountry)
router.get('/countries',  countryController.getCountries)

module.exports = router