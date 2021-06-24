/*
 * Controller
 *************/
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Page de connexio
exports.get = (req, res) => {
    res.render('connexion');
}

// Method POST s'enregistrer
exports.create = async (req, res) => {
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    let sql = `INSERT INTO user (name, email, password) values(?)`;
    let values = [req.body.name, req.body.email, encryptedPassword];
    console.log("controlleur create user : ", req.body)
    // en mode async
    // await query(sql, [values])

    await db.query(sql, [values], function (err, data, fields) {
        if (err) console.log(err)
        res.render('connexion', {
            success: 'Votre compte à bien été créé !'
        })
    })
}

// Se connecter
exports.login = async (req, res) => {

    let sql = `SELECT * FROM user WHERE email = ?`;
    let email = [req.body.email];

    console.log('body login :', req.body.email)

    await db.query(sql, [email], (error, results, fields) => {
        if (error) throw error;
        else {
            console.log('Controller login: ', results)
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (result) {
                        return res.render('home', { success: "Vous êtes connecté !" });
                    } else {
                        return res.render('home', {
                            error: 'Mot de passe incorrect !'
                        })
                    }
                })
            } else {
                return res.render('home', {
                    error: 'l\'Email est inconnu !'
                })
            }
        }

    })
}

// Method Lost password
// Nodemailer 
exports.lostPassword = async (req, res) => {
    console.log('Controller lostPassword: ', req.body)

    res.render('connexion');
}