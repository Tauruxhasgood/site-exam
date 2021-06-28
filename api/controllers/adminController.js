/*
 * Controller
 *************/

// const { query } = require("express");

exports.get = async (req, res) => {
    res.render('admin', {
        // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
        layout: 'adminLayout',
        // listUser qui est récupéré dans la boucle #each du partial admin > tableUsers.hbs
        listUser: await query('SELECT * FROM user')
    })
}


exports.deleteOne = async (req, res) => {

    let sql = `DELETE FROM user WHERE id = ?`;
    let id = [req.params.id];

    // console.log('body id :', req.params.id)

    await query(sql, [id])

    res.redirect('/admin')

    // res.render('admin', {
    //     success: "L'utilisateur a bien été supprimé !",
    //     listUser: await query('SELECT * FROM user')
    // });
}

exports.editOne = async (req, res) => {
    console.log('Controller Edit User :', req.body)
    // let isAdmin = '0', isVerified = '0', isBan = '0'

    // if (req.body.isAdmin === 'on') isAdmin = '1'
    // if (req.body.isVerified === 'on') isVerified = '1'
    // if (req.body.isBan === 'on') isBan = '1'

    let sql = `UPDATE user
               SET name = '${req.body.name}',
                   email = '${req.body.email}',
                   isAdmin = '${(req.body.isAdmin === 'on' ? '1' : '0')}',
                   isVerified = '${(req.body.isVerified === 'on' ? '1' : '0')}',
                   isBann = '${(req.body.isBann === 'on' ? '1' : '0')}'
               WHERE id = '${req.params.id}';`

    await query(sql)

    res.redirect('/admin')
}
