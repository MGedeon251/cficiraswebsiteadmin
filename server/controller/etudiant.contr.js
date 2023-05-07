const connection = require('../config/database')
const bcrypt = require('bcrypt') 
const saltRound = 10 ; 


exports.getAllEtudiant = (req, res)=>{
    connection.query(`SELECT *
                      FROM etudiants_par_classe_cplet`,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Impossible de charger cette page")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLicInfo1A = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=1 ; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLicInfo1B = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=2 ; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLicInfo1C = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=3 ; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLapA = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=4 ; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLapB = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=5 ; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLapC = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=6; ` ,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}


exports.getEtudiantLicInfo2A = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=7 ; `,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLicInfo2B = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=8 ; `,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.getEtudiantLap2A = (req, res)=>{
    connection.query(`SELECT *
                      FROM portal_etudiants 
                      where classe=9 ; `,
                (err,rows)=>{
                if(err){
                    req.flash("message", "Erreur au niveau de la base de données")
                    res.redirect('/home')
                }
                else{ res.render('portal/etudiant', { data : rows } )
                }
            }
        )
}

exports.addEtudiant = (req, res)=>{
    const {et_nom, et_prenom, et_matricule, et_sexe,et_tel, et_datenais , classe  } = req.body ;
    let {cmatricule , password }= req.body ; 
    const newEtudiant={ 
        et_nom, 
        et_prenom, 
        et_matricule, 
        et_sexe, 
        et_tel, 
        et_datenais ,
        classe
    } ; 
    if(et_nom==""){
        req.flash("message", " Le champ 'Noms' ne peut être vide")
        return res.redirect('/etudiant')
    }
    if(et_prenom == ""){
        req.flash("message", " Le champ 'Prenoms' ne peut être vide")
        return res.redirect('/etudiant')
    }
    if(et_matricule == ""){
        req.flash("message", " Le champ 'Matricule' ne peut être vide")
        return res.redirect('/etudiant')
    }
    if(et_sexe== ""){
        req.flash("message", " Le champ 'Sexe' ne peut être vide")
        return res.redirect('/etudiant')
    }
    if(et_datenais== ""){
        req.flash("message", " Le champ 'date de naissance ' ne peut être vide")
        return res.redirect('/etudiant')
    }

    if(password=="")
    {
        req.flash("message", " Le champ 'Mot de passe' ne peut être vide")
        return res.redirect('/etudiant') ; 
    }
    // CREATION DE L'ETUDIANT
    connection.query("INSERT INTO `portal_etudiant` (`et_matricule`, `et_nom`, `et_prenom` , `et_datenais` , `et_tel` , `classe`) values (?,?,?,?,?,?) ", 
    [et_matricule,et_nom,et_prenom,et_datenais,et_tel,classe]) ;
    // CREATION DU COMPTE D'UTILISATEUR
    const hash_pwd = bcrypt.hashSync(password,saltRound);
    cmatricule = newEtudiant.et_matricule; 
    connection.query("INSERT INTO `portal_compte` (`compt_matricule`, `compt_password`) values (?,?)", 
    [cmatricule, hash_pwd]) ;  
    req.flash("success" , "Etudiant enregistré avec succèss");
    console.log(req.body) ; 
    return res.redirect('/etudiant') ;

}
