module.exports = function (req, res, next) {

    if (req.method === "OPTIONS"){ next() }

    try {
        console.log(res.headers)
        next()
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({message: "Not found"})
    }
}