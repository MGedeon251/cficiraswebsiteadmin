const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const path = require('path');
const PORT = process.env.PORT || 3520
const app = express()

const routes = require('./server/routes/routes.users') //liens routes
/** MOTEUR DE RENDU */
app.set('view engine', 'ejs')

/* MIDDLEWARE */
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
//SESSIONS 
app.use(session({
  secret : 'cficiras',
  resave : true,
  saveUninitialized : true, 
  //store: new MySQLStore(connection) , // ajouter le module 'express-mysql-session'
  cookie : { secure : false}
}
))
app.use(flash());
// Global variables
app.use((req, res, next) => {
  res.locals.message = req.flash("message");
  res.locals.success = req.flash("success");
  next();
});
// Middleware de gestion de fichiers 
app.use(fileUpload());
//Route Application
app.use(routes)
//var portal = require('./_portal/app.js');
//app.use('/portal', portal);

/** CHARGE LES COMPOSANTS UI  */
app.use('/css', express.static(path.resolve(__dirname,'assets/css')))
app.use('/img', express.static(path.resolve(__dirname,'assets/images')))
app.use('/fonts', express.static(path.resolve(__dirname,'assets/fonts')))
app.use('/js', express.static(path.resolve(__dirname,'assets/js')))
app.use('/scss', express.static(path.resolve(__dirname,'assets/sass')))
app.use('/vendors', express.static(path.resolve(__dirname,'assets/vendors')))
app.use('/upload', express.static(path.resolve(__dirname,'server/uploads')))
app.use(express.static('public'));


// renvoie la PAGE 404 
app.listen(PORT, ()=> { console.log(`Serveur active sur http://localhost:${PORT}`)});