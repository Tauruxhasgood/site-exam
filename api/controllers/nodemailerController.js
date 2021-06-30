
// IMPORT NODEMAILER

require('dotenv').config()
const nodemailer = require('nodemailer')


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

module.exports = {
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
    sendVerif: (req, res) => {
        rand = Math.floor((Math.random() * 100) + 54)
        host = req.get('host')
        link = "http://" + req.get('host') + "/editPassword/" + rand
        mailOptions = {
            from: 'embarquementimmediat7@gmail.com',
            to: req.body.email,
            subject: "Veuillez confirmez votre Email svp.",
            rand: rand,
            html: `
                <h2>Encore un petit effort</h2><br>
                <h5>Cliquer sur le lien suivant afin de finir la procédure de validation de mail</h5><br>
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
        res.render('home', {
            success: "Un email de vérification à bien été envoyé à " + req.body.email
        })
    },

    verifMail: async (req, res) => {

        console.log('check editpassword: ', rand)
        const user = await query('SELECT * FROM user')


        if (Number(req.params.id) !== rand) res.render('connexion', { error: 'Une erreur est survenu !' })
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Domain is matched. Information is from Authentic email")
            if (req.params.id == mailOptions.rand) {
                console.log("email is verified")
                res.render('editPassword', {
                    email: mailOptions.to,
                    user: user
                })
            } else {
                console.log("email is not verified")
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


}

