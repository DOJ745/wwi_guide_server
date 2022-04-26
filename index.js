const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morganBody = require('morgan-body'); // Log middleware

const authRouter = require('./routers/AuthRouter')
const dbRouter = require('./routers/DbRouter')
const {dbName, dbUsername, dbPassword, apiURL} = require('./config/config')

const PORT = process.env.PORT || 5000

const app = express()

// ---------- MIDDLEWARE ----------

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
morganBody(app);

// ----------ERROR HANDLER ----------

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({message:`Something broke!\n ${err.message}`});
});

// ---------- ROUTES MIDDLEWARE ----------

app.use(`${apiURL}/auth`, authRouter)
app.use(`${apiURL}`, dbRouter)

app.get(`${apiURL}/test`, (req, res) => {
    res.send("Test GET request 12345678")
})

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@wwiguidedb.asigw.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        app.listen(PORT,() => console.log(`Server working on port ${PORT}\n`))
    } catch (e) { console.log(e) }
}

start()

// TODO: API URL for work with data, pages will be SEPARATE from API URL => pages make calls to api