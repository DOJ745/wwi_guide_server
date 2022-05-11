const CODES = require('../config/status_codes')

module.exports = {
    /**
     * @param res response object
     * @param elementName string
     * @param operationName string
     * @param operationResult JSON object for web app (added/updated obj; for AJAX)
     * @returns {json}
     * Status code: 200
     * message: Element successfully added/deleted/updated
     * operationResult: JSON object; if null => no such element in JSON doc
     */
    successElemOperation: function(res, elementName, operationName, operationResult) {
        if(operationResult != null)
            return res.status(CODES.SUCCESS).json({"message": `${elementName} successfully ${operationName}`, operationResult})
        else
            return res.status(CODES.SUCCESS).json({"message": `${elementName} successfully ${operationName}`})
    }
}