const Country = require('../../models/Country')
const IDataController = require("../interfaces/DataControllerInterface");
const ErrorResponses = require("../../responses/ErrorResponses")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const ModelsElements = require("../../models/models_elements")
const {validationResult} = require("express-validator");
const Armament = require("../../models/Armament");

class CountryController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.COUNTRY, errors)
            }

            const {name, img} = req.body
            const candidate = await Country.findOne({name})

            if (candidate) {return ErrorResponses.elementExists(res, ModelsElements.COUNTRY)}

            const newElem = new Country({name: name, img: img})
            await newElem.save()

            return res.status(200).json({message: "Country successfully added"})
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
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.COUNTRY, errors)
            }
        }
        catch (e){

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