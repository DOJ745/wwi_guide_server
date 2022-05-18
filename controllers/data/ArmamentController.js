const Armament = require('../../models/Armament')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");
const Achievement = require("../../models/Achievement");
const Survey = require("../../models/Survey");

class ArmamentController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.ARMAMENT, errors)
            }

            const {
                title,
                text_paragraphs,
                images,
                images_titles,
                achievementId,
                surveyId,
                category,
                subcategory
            } = req.body
            const candidate = await Armament.findOne({title})
            const idCandidate = await Achievement.findOne({achievementId})
            const secondIdCandidate = await Survey.findOne({surveyId})

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.EVENT) }
            if (idCandidate === null) { return ErrorResponses.noSuchElement(res, ModelsElements.ACHIEVEMENT) }
            if (secondIdCandidate === null ) { return ErrorResponses.noSuchElement(res, ModelsElements.SURVEY) }

            const newElem = new Armament({
                title: title,
                text_paragraphs: text_paragraphs,
                category: category,
                subcategory: subcategory,
                images: images,
                images_titles: images_titles,
                achievementId: achievementId,
                surveyId: surveyId
            })
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.ARMAMENT, CRUD_OPERATIONS.ADDED)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.ARMAMENT, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.ARMAMENT, errors)
            }
        }
        catch (e){
            console.log(e)
            return ErrorResponses.crudOperationError(res, ModelsElements.ARMAMENT, CRUD_OPERATIONS.UPDATING, e)
        }
    }


    async getElems(req, res) {
        try {
            const elems = await Armament.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/armament', {title: "Armament", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new ArmamentController()