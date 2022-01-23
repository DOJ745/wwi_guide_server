const Router = require('express')
const router = new Router()
const yearController = require('../controllers/YearController')
const { check } = require('express-validator')

const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/years',
    [
        check('date', 'Date of the year cannot be empty and must be 4 symbols!')
            .notEmpty()
            .isLength({min: 4, max: 4})
    ],
    roleMiddleware(['ADMIN', 'USER']),
    yearController.addYear)

router.get('/years', roleMiddleware(['ADMIN', 'USER']), yearController.getYears)

module.exports = router