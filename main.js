const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 9000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://mainUser:mainUserPassword@wwiguidedb.asigw.mongodb.net/wwiGuideDb?retryWrites=true&w=majority')
        app.listen(PORT,() => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()