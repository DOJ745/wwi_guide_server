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

            return SuccessResponses.successElemOperation(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.ADDING, e)
        }
    }

    async updateElem(req, res) {
        try {
            /*const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.ACHIEVEMENT, errors)
            }*/
            const {name, description, points, img, id} = req.body
            Achievement.findByIdAndUpdate(id,
                {
                    name: name,
                    description: description,
                    points: points,
                    img: img
                },
                {new: true},
                function(err, result) {
                    if(err)
                        return ErrorResponses.crudOperationError(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.UPDATING, err)
                    else
                        return SuccessResponses.successElemOperation(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.UPDATED, result)
                }
            )
        }
        catch (e){
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.ACHIEVEMENT, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.ACHIEVEMENT, errors)
            }
            const id = req.body
            Achievement.findByIdAndDelete(id)
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await Achievement.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else  res.render('data/achievements', {title: "Achievements", elements: elems})
        }
        catch (e) {
            console.log(e)
            return ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new AchievementController()