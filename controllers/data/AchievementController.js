const Achievement = require('../../models/Achievement')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const IDataController = require("../interfaces/DataControllerInterface");
const SuccessResponses = require("../../responses/SuccessResponses");
const CRUD_OPERATIONS = require("../../config/crud_operations");
const {validationResult} = require("express-validator");

class AchievementController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.ACHIEVEMENT, errors)
            }

            const {name, description, points, img} = req.body
            const candidate = await Achievement.findOne({name})

            if(candidate) { return ErrorResponses.elementExists(res, ModelsElements.ACHIEVEMENT) }

            const newElem = new Achievement({name: name, description: description, points: points, img: img})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.ADDED)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.ADDING, e)
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