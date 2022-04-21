const User = require('../../models/User')
const ErrorResponses = require("../../responses/error_responses")
const ModelsElements = require("../../models/models_elements")
const IDataController = require("../interfaces/DataControllerInterface");

class UserController extends IDataController {

    constructor() { super(); }

    async addElem(req, res) {
        try {}
        catch (e) {
            console.log(e)
            ErrorResponses.addingElementError(res, ModelsElements.USER, e)
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const elems = await User.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new UserController()