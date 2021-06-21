/*
 * Controller
 *************/ 


// Method Post
exports.create = async (req, res) => {
    let sql = `INSERT INTO user (name, email, password) values(?)`;
    let values = [req.body.name, req.body.email, req.body.password];


    await db.query(sql, [values], function (err, data, fields) {
        if (err) throw error;
        res.json({
            status: 200,
            listUser: data,
            message: "Add User succesfully"
        })
    })
}

exports.get = (req, res) => {
    res.render('connexion');
}