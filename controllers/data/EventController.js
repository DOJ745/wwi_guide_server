const Event = require('../../models/Event')
const Year = require('../../models/Year')
const ErrorResponses = require("../../responses/ErrorResponses")
const SuccessResponses = require("../../responses/SuccessResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const Armament = require("../../models/Armament");

class EventController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.EVENT, errors)
            }

            const {title, text, images, yearId} = req.body
            const candidate = await Event.findOne({title})
            const idCandidate = await Year.findOne({yearId})

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.EVENT) }
            if (idCandidate === null) { return ErrorResponses.noSuchElement(res, ModelsElements.YEAR) }

            const newElem = new Event({title: title, text: text, images: images, yearId: yearId})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.EVENT, CRUD_OPERATIONS.ADDED)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.EVENT, CRUD_OPERATIONS.ADDING, e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.EVENT, errors)
            }
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.EVENT, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await Event.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/events', {title: "Events", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new EventController()