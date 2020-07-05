
//Modulos requeridos
const express =require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


//Conexion a la base de datos
//17 importa el url del archvo database.js
const {url} =require('./config/database');
mongoose.connect(url,{
    useMongoClient: true
});

//configuracion del passport antes de inicializar
require('./config.passport')(passport);
//Configuracion
app.set('port', process.env.PORT || 3000);
//Vistas

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//midleware
//30 para que aparezca en consola
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret:'palabrasecreta',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize);
    //para guardar la informacion del usuario logueado
app.use(passport.session());
app.use(flash());



//routes
require('./app/routes')(app, passport);
//static file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})

app 