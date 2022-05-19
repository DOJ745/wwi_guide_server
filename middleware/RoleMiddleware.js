const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const ErrorResponses = require('../responses/ErrorResponses')

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

            else {
                if(req.baseUrl === '/api.wwi-guide.by') return ErrorResponses.unauthorized(res)
                else return res.render('error', {errorMsg: "401 Unauthorized"})
            }

            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) { hasRole = true }
            })

            if(!hasRole) {
                if(req.baseUrl === '/api.wwi-guide.by') return ErrorResponses.noRoleAccess(res)
                else return res.render('error', {errorMsg: "403 Your role doesn't have access"})
            }

            next()
        }
        catch (e) {
            console.log(e)
            if(req.baseUrl === '/api.wwi-guide.by') return ErrorResponses.unauthorized(res)
            else return res.render('error/error', {errorMsg: "401 Unauthorized"})
        }
    }
}
