/*
 * Controller
 *************/
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Method POST s'enregistrer
exports.create = async (req, res) => {
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    let sql = `INSERT INTO user (name, email, password) values(?)`;
    let values = [req.body.name, req.body.email, encryptedPassword];
    console.log("controlleur create user : ", req.body)

    await db.query(sql, [values], function (err, data, fields) {
        if (err) console.log(err)
        res.render('connexion', {
            success: 'Votre compte à bien été créé !'
        })
    })
}

// Se connecter

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

}

exports.get = (req, res) => {
    res.render('connexion');
}