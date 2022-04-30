const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morganBody = require('morgan-body'); // Log middleware

const AuthRouter = require('./routers/AuthRouter')
const DbRouter = require('./routers/DbRouter')
const ViewRouter = require('./routers/ViewRouter')
const {dbName, dbUsername, dbPassword, apiURL} = require('./config/config')

const PORT = process.env.PORT || 5000

const app = express()

// ---------- PUBLIC RESOURCES ----------
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/toggle-pass/css', express.static(__dirname + '/node_modules/bootstrap-show-password-toggle/css'));
app.use('/toggle-pass/js', express.static(__dirname + '/node_modules/bootstrap-show-password-toggle/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// VIEW ENGINE SETUP
app.set("view engine", "pug");

// ---------- MIDDLEWARES ----------

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
morganBody(app);

// ---------- ERROR HANDLERS ----------

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({message:`Something broke!\n ${err.message}`});
});

// ---------- ROUTES MIDDLEWARE ----------

app.use(`${apiURL}/auth`, AuthRouter)
app.use(`${apiURL}`, DbRouter)
app.use(`/`, ViewRouter)

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
// TODO: modify bootstrap-show-password-toggle css styles on main PC