const Country = require('../../models/Country')
const IDataController = require("../interfaces/DataControllerInterface");
const ErrorResponses = require("../../responses/ErrorResponses")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const ModelsElements = require("../../models/models_elements")
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");
const TestTheme = require("../../models/TestTheme");

class CountryController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.COUNTRY, errors)
            }

            const {name, img} = req.body
            let newElem

            const candidate = await Country.findOne({name})
            if (candidate) {return ErrorResponses.elementExists(res, ModelsElements.COUNTRY)}

            newElem = new Country({name: name, img: img})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.COUNTRY, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.COUNTRY, CRUD_OPERATIONS.ADDING, e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.COUNTRY, errors)
            }
            const {name, img, id} = req.body
            const updDoc = await Country.findByIdAndUpdate(id,
                {
                    name: name,
                    img: img
                },
                {new: true})
            if(updDoc)
                return SuccessResponses.successElemOperation(res, ModelsElements.COUNTRY, CRUD_OPERATIONS.UPDATED, updDoc)
        }
        catch (e){
            console.log(e)
            return ErrorResponses.crudOperationError(res, ModelsElements.COUNTRY, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async getElems(req, res) {
        try {
            const elems = await Country.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/countries', {title: "Countries", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }

}

module.exports = new CountryController()