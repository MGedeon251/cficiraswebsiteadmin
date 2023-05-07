const express = require('express')
const app = express.Router()

const ctrEtudiant = require('../controller/etudiant.contr'); 



app.get('/',  (req, res)=> {
    res.render('index');
});

app.get('/home',  (req, res)=> {
    res.render('index');
});

app.get('/login', (req, res)=> {
    res.render('auth-view/login');
});

app.get('/etudiant',ctrEtudiant.getAllEtudiant); 

app.get('/modules', (req, res)=>{
    res.render('portal/modules');
})

app.get('/examens', (req, res)=>{
    res.render('portal/examen');
})

app.get('/parcours', (req, res)=>{
    res.render('portal/parcours');
})

app.get('/notes', (req, res)=>{
    res.render('portal/notes');
})

app.get('/schedule', (req, res)=>{
    res.render('portal/schedule');
})

app.get('/users', (req, res)=>{
    res.render('portal/users');
})

app.get('/inscription', (req, res)=>{
    res.render('portal/inscription');
})
app.get('/supcours', (req, res)=>{
    res.render('portal/spcours');
})


// METHODES POSTS

app.post('/addEtudiant', ctrEtudiant.addEtudiant ) ; 

module.exports = app ;