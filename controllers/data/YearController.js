const Year = require('../../models/Year')
const IDataController = require("../interfaces/DataControllerInterface");
const ErrorResponses = require("../../responses/ErrorResponses")
const SuccessResponses = require("../../responses/SuccessResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const {validationResult} = require("express-validator");

class YearController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.YEAR, errors)
            }

            const {date, title, img} = req.body
            const candidate = await Year.findOne({date})

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.YEAR) }

            const newElem = new Year({date: date, title: title, img: img})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.YEAR, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.YEAR, CRUD_OPERATIONS.ADDING, e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.YEAR, errors)
            }
            const {date, title, img, id} = req.body
            const updDoc = await Year.findByIdAndUpdate(id,
                {
                    date: date,
                    title: title,
                    img: img
                },
                {new: true})
            if(updDoc)
                return SuccessResponses.successElemOperation(res, ModelsElements.YEAR, CRUD_OPERATIONS.UPDATED, updDoc)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.YEAR, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async getElems(req, res) {
        try {
            const elems = await Year.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/years', {title: "Years", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new YearController()