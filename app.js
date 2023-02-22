const express = require('express')
const path = require('path')


const cookieParse = require('cookie-parser')
const morgarn = require('morgan')
const sessions = require('express-session')
const MysqlStore = require('express-mysql-session')(sessions);
const dotenv = require('dotenv')
dotenv.config()

const indexRoute = require('./routes/index')

const app = express()


//Conf options to express-mysql-session
const options = {
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

const sessionStore = new MysqlStore(options);

// middleware to express-mysql-session
app.use( sessions({
    key: 'my_cookie',
    secret: 'joan',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

// ------------

// Setters
app.set( 'views', path.join(__dirname, 'views') )
app.set('view engine','ejs')

app.set('port',3000)

// Middleware

app.use(express.urlencoded( {extended: false} ))
// Cookie parser
app.use( cookieParse() )
//public files
app.use( express.static(path.join(__dirname,'./public')))
// Morgan Logger
app.use( morgarn('dev') )

//Sesions Locals
// app.use(sesions({
//     secret:'joan',
//     resave: true,
//     saveUninitialized: true,
// }))

// Routes

app.use( '/', indexRoute )

// Error 404 not found
app.use('*', (req, res, next) => {
    next( res.sendStatus(404), '<h1> Error 404 File Not Found</h1>' )
})

app.listen(
    app.get('port'), console.log('Server listen at port: ', app.get('port'))
);