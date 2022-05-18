const User = require('../../models/User')
const Achievement = require('../../models/Achievement')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");
const mongoose = require("mongoose");

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

            const {login, achievements, score, id} = req.body
            let idCandidate, allValid = false

            if(id === null || typeof id === 'undefined') {
                const updDoc = await User.findOneAndUpdate({login: login},
                    {
                        login: login,
                        achievements: achievements,
                        score: score
                    },
                    {new: true})
                if(updDoc)
                    return SuccessResponses.successElemOperation(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATED, updDoc)
            }
            else {
                achievements.forEach(achievementId => {
                    console.log("ACHIEVEMENT ID: " + achievementId)
                    if(mongoose.Types.ObjectId.isValid(achievementId)) {
                        idCandidate = Achievement.findById(achievementId)
                        if (idCandidate === null) { return ErrorResponses.noSuchElement(res, ModelsElements.ACHIEVEMENT) }
                        else allValid = true
                    }
                    else return ErrorResponses.invalidId(res, ModelsElements.ACHIEVEMENT)
                })

                if(allValid) {
                    const updDoc = await User.findByIdAndUpdate(id,
                        {
                            login: login,
                            achievements: achievements,
                            score: score
                        },
                        {new: true})
                    if(updDoc)
                        return SuccessResponses.successElemOperation(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATED, updDoc)
                }
                else return ErrorResponses.invalidId(res, ModelsElements.ACHIEVEMENT)
            }
        }
        catch (e){
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.USER, CRUD_OPERATIONS.UPDATING, e)
        }
    }


    async getElems(req, res) {
        try {
            const elems = await User.find({roles: { $in: ['USER'] } } )
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