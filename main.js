const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require('./routers/authRouter')
const dbRouter = require('./routers/dbRouter')
const {dbName, dbUsername, dbPassword} = require('./config/config')

const PORT = process.env.PORT || 9000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use((req, res, next, err) => {
  res.status(500).json({"message": "Internal server error!", "error": err.message})
})

app.use('/auth', authRouter)
app.use('/db', dbRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@wwiguidedb.asigw.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        app.listen(PORT,() => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()