const Year = require('../models/Year')
const IDataController = require("./interfaces/DataControllerInterface");
const ErrorResponses = require("../responses/error_responses")
const ModelsElements = require("../models/models_elements")
class YearController extends IDataController {

    async addElem(req, res) {
        try {
            const {date, title, img} = req.body
            const candidate = await Year.findOne({date})

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.YEAR) }

            const newElem = new Year({date: date, title: title, img: img})
            await newElem.save()

            return res.status(200).json({"message": "Year successfully added"})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.addingElementError(res, ModelsElements.YEAR, e)
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const years = await Year.find()
            res.json(years)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new YearController()