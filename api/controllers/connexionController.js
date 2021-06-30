/*
 * Controller
 *************/
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Page de connexion
exports.get = (req, res) => {
    console.log('page conn: ', req.session)
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
    console.log('que contient value :',values)
    await query(sql, [values], function (err, data, fields) {
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

    await query(sql, [email], (error, results, fields) => {
        if (error) throw error;
        else {
            console.log('Controller login: ', results)
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (result) {
                        req.session.user = {
                            name: results[0].name,
                            email: results[0].email,
                            isAdmin: results[0].isAdmin,
                            isVerified: results[0].isVerified,
                            isBann: results[0].isBann,
                            avatar: results[0].avatar
                        }
                        console.log('conn: ', req.session)
                        res.locals.user = req.session.user

                        if (results[0].isAdmin === 1) {
                            req.session.isAdmin = true
                            res.locals.admin = true
                            return res.redirect('/admin')
                        } else {
                            req.session.isAdmin = false
                            res.locals.admin = false
                            return res.render('home', { success: "Vous êtes connecté !", timeoutLogin: true });
                        }
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



exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('petiGato')
        console.log(req.session)
        res.redirect('/')
    })
}

