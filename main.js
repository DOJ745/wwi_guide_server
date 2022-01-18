const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const {dbName, dbUsername, dbPassword} = require('./config/config')

const PORT = process.env.PORT || 9000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@wwiguidedb.asigw.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        app.listen(PORT,() => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()