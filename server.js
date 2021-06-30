/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
    express = require('express'),
    app = express(),
    mysql = require('mysql'),
    hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    util = require('util'),
    port = process.env.PORT || 3000;

app.use(methodOverride('_method'))

require('dotenv').config()

//mySQL
db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) console.log('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

const query = util.promisify(db.query).bind(db);
global.query = query;

// Express-session
app.use(expressSession({
    secret: 'securite',
    name: 'petiGato',
    saveUninitialized: true,
    resave: false,
    // cookie: { maxAge : 30000}
}));

const { inc } = require('./api/helpers')

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    helpers: {
        inc
    },
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'adminLayout'
}));

// Express static permet de diriger un chemin sur un dossier en particulier
app.use('/assets', express.static('public'));

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('*', (req, res, next) => {
    // On definit nos variable locals pour pouvoir les utiliser dans notre HBS
    res.locals.user = req.session.user

    if (req.session.isAdmin === true) res.locals.admin = req.session.isAdmin

    console.log('res.locals: ', req.session)
    next()
})

// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)

// app.use((req, res) => {
//     res.render('err404')
// })

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});