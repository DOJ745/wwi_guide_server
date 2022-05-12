const User = require('../../models/User')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");

class UserController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.USER, errors)
            }
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.USER, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.USER, errors)
            }

            const {login, achievements, score} = req.body
            User.findOneAndUpdate(login,
                {
                    achievements: achievements,
                    score: score
                },
                {new: true},
                function(err, result) {
                    if(err)
                        return ErrorResponses.crudOperationError(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATING, err)
                    else
                        return SuccessResponses.successElemOperation(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATED, result)
                }
            )

        }
        catch (e){
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.USER, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await User.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/users', {title: "Users", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new UserController()