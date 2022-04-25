const Achievement = require('../../models/Achievement')
const ErrorResponses = require("../../responses/error_responses")
const ModelsElements = require("../../models/models_elements")
const IDataController = require("../interfaces/DataControllerInterface");
const SuccessResponses = require("../../responses/success_responses");
const CRUD_OPERATIONS = require("../../config/crud_operations");

class AchievementController extends IDataController {

    constructor() { super(); }

    async addElem(req, res) {
        try {
            const {name, description, points, img} = req.body
            const candidate = await Achievement.findOne({name})

            if(candidate) { return ErrorResponses.elementExists(res, ModelsElements.ACHIEVEMENT) }

            const newElem = new Achievement({name: name, description: description, points: points, img: img})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.ADDED)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.addingElementError(res, ModelsElements.ACHIEVEMENT, e)
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const elems = await Achievement.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new AchievementController()