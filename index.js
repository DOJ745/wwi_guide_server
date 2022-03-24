const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morganBody = require('morgan-body'); // Log middleware

const authRouter = require('./routers/authRouter')
const dbRouter = require('./routers/dbRouter')
const {dbName, dbUsername, dbPassword} = require('./config/config')

const PORT = process.env.PORT || 9000
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
    res.status(500).json({"message":`Something broke!\n ${err.message}`});
});

// ---------- ROUTES MIDDLEWARE ----------

app.use('/auth', authRouter)
app.use('/api', dbRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@wwiguidedb.asigw.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        app.listen(PORT,() => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()