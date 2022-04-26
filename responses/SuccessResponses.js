const CODES = require('../config/status_codes')

module.exports = {
    /**
     * @param res response object
     * @param elementName string
     * @param operationName string
     * @returns {json}
     * Status code: 200
     * message: Element successfully added/deleted/updated
     */
    successElemOperation: function(res, elementName, operationName) {
        return res.status(CODES.SUCCESS).json({"message": `${elementName} successfully ${operationName}`})
    }
}