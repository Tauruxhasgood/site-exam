/*
 * Controller
 *************/
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

require('dotenv').config()

transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
})

var rand, mailOptions, host, link;

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


    await query(sql, [values], async function (err, data, fields) {
        if (err) console.log(err)

        const user = await query(`SELECT * FROM user where email = "${req.body.email}";`)


        rand = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        link = "http://" + req.get('host') + "/verification/" + rand;

        mailOptions = {
            from: 'embarquementimmediat7@gmail.com',
            to: user[0].email,
            subject: "Veuillez confirmez votre Email svp.",
            rand: rand,
            html: `
                    <h2>Encore un petit effort</h2><br>
                    <h5>Cliquer sur le lien suivant afin de finir la procédure de validation de votre mail !</h5><br>
                    <a href=" ` + link + ` ">Cliquez ici pour vérifier</a>`
        }
        console.log('Données de mailOption :', mailOptions)

        transporter.sendMail(mailOptions, (err, res, next) => {
            if (err) {
                console.log(err)
                res.end("error")
            } else {
                console.log("Message Envoyer")
                next()
            }
        })
        res.render('connexion', {
            success: 'Votre compte à bien été créé merci de vérifier vos emails !'
        })
        // console.log('Data Register: ', data, user[0])
        // res.render('connexion', {
        //     success: 'Votre compte à bien été créé !'
        // })
    })
}

exports.verificationMail = async (req, res) => {
    console.log('Retour de l\'email :', mailOptions.to, req.body);

    // if (!mailOptions) return res.render('connexion', { error: 'Une erreur est survenue !' })
    // if (Number(req.params.id) !== rand) return res.render('connexion', { error: 'Une erreur est survenue !'})

    // const user = await query(`SELECT * FROM user WHERE email = "${mailOptions.to}"`)

    // console.log('Mail de confirmation :', user);
}

// Se connecter
exports.login = async (req, res) => {

    let sql = `SELECT * FROM user WHERE email = ?`;
    let email = [req.body.email];

    console.log('body login :', req.body.email)

    await query(sql, [email], (error, results) => {
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

exports.verificationMail = (req, res) => {
    console.log('Controller Page Verification: ', req.params)
    res.render('verifMail');
}


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('petiGato')
        console.log(req.session)
        res.redirect('/')
    })
}

