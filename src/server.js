const express = require ('express');
const hbs = require('hbs');
const path = require ('path');
const morgan = require ('morgan');
const methodOverride = require ('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { getConnection } = require('./database');
require('dotenv').config();

//Llamar a la conexión
getConnection()
    .then((message) => {
        console.log(message);
    
    })
    .catch(console.log)

    
// iniciando

const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//variables globales (para que se vean los mansajes de flash)

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;


    next();
});

//rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notas.router'));
app.use(require('./routes/users.routes'));


// archivos estaticos

app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;