const ModelsElements = require("../../models/models_elements")
const LogModel = require('../../models/LogModel')
const ErrorResponses = require("../../responses/ErrorResponses")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");

class LogModelController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.LOG_MODEL, errors)
            }

            const {actionName, actionResult, timestamp} = req.body

            const newElem = new LogModel({actionName: actionName, actionResult: actionResult, timestamp: timestamp})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.LOG_MODEL, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.LOG_MODEL, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.LOG_MODEL, errors)
            }
        }
        catch (e){}
    }


    async getElems(req, res) {
        try {
            const elems = await LogModel.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/logs', {title: "Logs", elements: elems})
        }
        catch (e) {
            console.log(e)
            return ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new LogModelController()