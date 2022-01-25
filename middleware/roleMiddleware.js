const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports = function(roles) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") { next() }

        try {
            let token = ""

            if (req.cookies.access_token) {
                console.log(`COOKIE: ${req.cookies.access_token}, TYPE: ${typeof req.cookies.access_token}`)
                token = req.cookies.access_token
            }
            else if (req.headers.authorization &&
                req.cookies.access_token === undefined &&
                typeof req.cookies.access_token === "undefined"
                )
            {
                console.log(`AUTHORIZATION HAS BEEN MADE: ${req.headers.authorization}`)
                token = req.headers.authorization.split(' ')[1]
            }

            else { return res.status(401).json({message: "User without authorization token!"}) }

            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if(!hasRole) { return res.status(403).json({message: "You role doesn't have access"}) }

            next()
        }
        catch (e) {
            console.log(e)
            return res.status(401).json({message: "Unauthorised user"})
        }
    }
}
