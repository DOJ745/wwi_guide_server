const Country = require('../../models/Country')
const IDataController = require("../interfaces/DataControllerInterface");
const ErrorResponses = require("../../responses/error_responses")
const ModelsElements = require("../../models/models_elements")
class CountryController extends IDataController {

    constructor() { super(); }

    async addElem(req, res) {
        try {
            const {name, img} = req.body
            const candidate = await Country.findOne({name})

            if (candidate) {
                return ErrorResponses.elementExists(res, ModelsElements.COUNTRY)
            }

            const newElem = new Country({name: name, img: img})
            await newElem.save()

            return res.status(200).json({message: "Country successfully added"})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.addingElementError(res, ModelsElements.COUNTRY, e)
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const elems = await Country.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }

}

module.exports = new CountryController()