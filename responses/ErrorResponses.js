const CODES = require('../config/status_codes')

module.exports = {

    /**
     * @param res response object
     * @returns {json}
     * Status code: 400
     * message: For armament there is only 2 categories: weapon and technique!
     */
    noCategory: function (res) { return res.status(CODES.BAD_REQUEST).json({message: `For armament there is only 2 categories: weapon and technique!`}) },
    /**
     * @param res response object
     * @param elementName string
     * @returns {json}
     * Status code: 400
     * message: Such element already exist!
     */
    elementExists: function (res, elementName) { return res.status(CODES.BAD_REQUEST).json({message: `Such ${elementName} already exist!`}) },
    /**
     * @param res response object
     * @param error error object
     * @returns {json}
     * Status code: 400
     * message: Bad request!,
     * error: error.message
     */
    badRequest: function (res, error) { return res.status(CODES.BAD_REQUEST).json({message: "Bad request!", error: error.message}) },
    /**
     * @param res response object
     * @param elementName string (name of the model)
     * @param operationName string (adding/deleting/updating)
     * @param error error object
     * @returns {json}
     * Status code: 400
     * message: Error with adding the element!,
     * error: error.message
     */
    crudOperationError: function (res, elementName, operationName, error) {
        return res.status(CODES.BAD_REQUEST).json({message: `Error with ${operationName} the ${elementName}!`, error: error.message})
    },
    /**
     * @param res response object
     * @param elementName string
     * @returns {json}
     * Status code: 400
     * message: No such element!
     */
    noSuchElement: function (res, elementName){ return res.status(CODES.BAD_REQUEST).json({message: `No such ${elementName}!`}) },
    /**
     * @param res response object
     * @returns {json}
     * Status code: 400
     * message: Incorrect password!
     */
    incorrectPassword: function (res) { return res.status(CODES.BAD_REQUEST).json({message: "Incorrect password!"}) },
    /**
     * @param res response object
     * @param processName string
     * @param error error object
     * @returns {json}
     * Status code: 400
     * message: Process error occurred!,
     * error: string
     */
    exceptionOccurred: function (res, processName, error) {
        return res.status(CODES.BAD_REQUEST).json({message: `${processName} error occurred!`, error: error.message})
    },
    /**
     * @param res response object
     * @param modelName process name (year/user/rank validation error)
     * @param errors errors stack trace
     * @returns {json}
     * Status code: 400
     * message: Registration validation error!,
     * error: errors array
     */
    modelValidationError: function (res, modelName, errors) {
        return res.status(CODES.BAD_REQUEST).json({ message: `${modelName} validation error!`, "error": errors.array() })
    },
    /**
     * @param res response object
     * @returns {json}
     * Status code: 404
     * message: No such route!
     */
    noRoute: function (res){ return res.status(CODES.NOT_FOUND).json({message: "No such route!"}) },
    /**
     * @param res response object
     * @returns {json}
     * Status code: 401
     * { message: Unauthorised user }
     */
    unauthorized: function (res) { return res.status(CODES.UNAUTHORIZED).json({message: "Unauthorised user"}) },
    /**
     * @param res response object
     * @returns {json}
     * Status code: 403
     * { message: Your role doesn't have access }
     */
    noRoleAccess: function (res) { return res.status(CODES.FORBIDDEN).json({message: "Your role doesn't have access"}) }
};