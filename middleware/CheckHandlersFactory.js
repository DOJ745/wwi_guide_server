const { check } = require('express-validator')

class CheckHandlersFactory {
    createLengthMinMaxNotEmpty(fieldName, minLength, maxLength){
        return check(fieldName,
            `${fieldName} cannot be empty and is length must be between ${minLength} and ${maxLength} symbols!`)
            .notEmpty()
            .isLength({min: minLength, max: maxLength }).bail()
    }

    createIsIntNotEmpty(fieldName, minValue, maxValue){
        return check(fieldName, `WWI years are between ${minValue} and ${maxValue}!`)
            .notEmpty()
            .isInt({min: minValue, max: maxValue}).bail()
    }
}

module.exports = new CheckHandlersFactory()