const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const ErrorResponses = require('../responses/error_responses')

module.exports = function(roles) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") { next() }

        try {
            let token = ""

            if (req.cookies.access_token) {
                console.log(`COOKIE: ${req.cookies.access_token}, \n\tTYPE OF COOKIE: ${typeof req.cookies.access_token}`)
                token = req.cookies.access_token
            }
            else if (req.headers.authorization &&
                req.cookies.access_token === undefined &&
                typeof req.cookies.access_token === "undefined"
                )
            {
                console.log(`USER TOKEN: ${req.headers.authorization}`)
                token = req.headers.authorization.split(' ')[1]
            }

            else { return ErrorResponses.unauthorized(res) }

            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if(!hasRole) { ErrorResponses.noRoleAccess(res) }

            next()
        }
        catch (e) {
            console.log(e)
            ErrorResponses.unauthorized(res)
        }
    }
}
