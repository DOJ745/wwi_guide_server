const Router = require('express')
const router = new Router()

const yearController = require('../controllers/YearController')
const countryController = require('../controllers/CountryController')
const rankController = require('../controllers/RankController')

const { check } = require('express-validator')

const roleMiddleware = require('../middleware/roleMiddleware')

// ----- YEARS -----
router.get('/years', roleMiddleware(['ADMIN', 'USER']), yearController.getElems)
router.post('/years',
    [
        check('date', 'Date of the year cannot be empty and must be 4 symbols!')
            .notEmpty()
            .isLength({min: 4, max: 4})
    ],
    roleMiddleware(['ADMIN', 'USER']),
    yearController.addElem)
router.put('/years', roleMiddleware(['ADMIN']), yearController.updateElem)
router.delete('/years', roleMiddleware(['ADMIN']), yearController.deleteElem)

// ----- RANKS -----

router.get('/ranks', roleMiddleware(['ADMIN', 'USER']), rankController.getElems)
router.post('/ranks', roleMiddleware(['ADMIN']), rankController.addElem)
router.put('/ranks', roleMiddleware(['ADMIN']), rankController.updateElem)
router.delete('/ranks', roleMiddleware(['ADMIN']), rankController.deleteElem)

// ----- COUNTRIES -----
router.get('/countries',  countryController.getElems)
router.post('/countries', roleMiddleware(['ADMIN']), countryController.addElem)
router.put('/countries', roleMiddleware(['ADMIN']), countryController.updateElem)
router.delete('/countries', roleMiddleware(['ADMIN']), countryController.deleteElem)

// ----- USERS -----
// ----- EVENTS -----
// ----- ACHIEVEMENTS -----
// ----- SURVEYS -----
// ----- TESTS -----
// ----- LOGS -----

module.exports = router