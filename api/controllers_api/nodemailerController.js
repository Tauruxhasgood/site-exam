
// IMPORT NODEMAILER

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
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

// module.exports = {
// test: (req, res) => {
//     console.log(req.body)

//     const mailOptions = {
//         from: 'embarquementimmediat7@gmail.com',
//         to: req.body.email,
//         subject: 'test pour voir si nodemailer fonctionne, ' + req.body.author + ' !',
//         html: `<h2>${req.body.author}, Ton premier mail avec nodemailer, Successfull !!</h2>`
//     }

//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) console.log(err)
//         else {
//             console.log(info)
//             res.render('home', {
//                 success: "un email à bien été envoyer à " + req.body.email
//             })
//         }
//     })
// }

exports.sendVerif = async (req, res) => {
    console.log('body login :', req.body.email)
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/editPassword/" + rand;

    const emailExist = await query(`SELECT user.email FROM user WHERE email = "${req.body.email}";`)
    console.log('emailExist: ', emailExist)

    if (!emailExist[0]) res.render('home', { error: 'l\'Email est inconnu !' })
    else {
        console.log('Le mail existe dans la db !!!')
        mailOptions = {
            from: 'embarquementimmediat7@gmail.com',
            to: req.body.email,
            subject: "Veuillez confirmez votre Email svp.",
            rand: rand,
            html: `
                <h2>Encore un petit effort</h2><br>
                <h5>Cliquer sur le lien suivant afin de finir la procédure de validation de nouveau mot de passe</h5><br>
                <a href=" ` + link + ` ">Cliquez ici pour vérifier</a>`
        }
        console.log(mailOptions)

        transporter.sendMail(mailOptions, (err, res, next) => {
            if (err) {
                console.log(err)
                res.end("error")
            } else {
                console.log("Message Envoyer")
                next()
            }
        })
        return res.render('home', {
            success: "Un email de vérification à bien été envoyé à " + req.body.email
        })

    }
}

exports.verifMail = async (req, res) => {
    console.log('check editpassword: ', rand)
    
    if (!mailOptions) return res.render('connexion', { error: 'Une erreur est survenu !' })
    if (Number(req.params.id) !== rand) return res.render('connexion', { error: 'Une erreur est survenu !' })

    const user = await query(`SELECT * FROM user WHERE email = "${mailOptions.to}"`)

    console.log('Edit password mail: ', user)

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email")

        if (req.params.id == mailOptions.rand) {
            console.log("email is verified: ", user[0])
            res.render('editPassword', {
                user: user[0]
            })

        } else {
            res.render('editPassword', {
                message: "Bad request !"
            })
        }

    } else {
        res.render('editPassword', {
            message: "Request is from unknown source !"
        })
    }
}

exports.updatePassword = async (req, res) => {
    console.log('Controller Update Password', req.body, req.params)
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    // console.log(encryptedPassword);

    let sql = `UPDATE user
               SET password = '${encryptedPassword}'
               WHERE id = '${req.params.id}';`

    await query(sql, encryptedPassword)

    // console.log(await query('select * from user where id = 6'))

    res.render('connexion', {
        success: 'Votre mot de passe a bien été modifié !'
    })
}