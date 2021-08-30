/*
 * Controller PANNEAU USER
 *************/
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.get = async (req, res) => {
    res.render('user', {
        userID: await query(`SELECT id,name,email,avatar FROM user WHERE email = '${req.session.user.email}'`),
        userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                   FROM comments
                                   LEFT JOIN user
                                   ON user.id = comments.author_id
                                   WHERE author_id = ${req.session.user.id}`),
    })
}

exports.modifyComment = async (req, res) => {
    console.log('données de req.body :', req.body);
    const sql = `UPDATE comments
                  SET content = "${req.body.content}"
                  WHERE id = "${req.params.id}";`
    console.log('contenu de content :', req.body.content);
    await query(sql)

    res.redirect('/user')
}

exports.deleteCommentById = async (req, res) => {
    const sql = `DELETE FROM comments WHERE id =?`;
    let values = [req.params.id];

    await query(sql, [values])
    res.redirect('/user')
}

exports.modifyAccount = async (req, res) => {
    console.log('données avant if :', req.body);
    if (!req.file) {
        const sql = `UPDATE user
                     SET 
                        name = '${req.body.name}',
                        email = '${req.body.email}'
                     WHERE id = '${req.params.id}';`

        console.log('données modifiées:', req.body.name, req.body.email);
        await query(sql)
        res.redirect('/user')

    } else {
        const user =  await query(`SELECT * FROM user WHERE id = '${req.params.id}'`)
        const sql = `UPDATE user
                     SET
                        name = '${req.body.name}',
                        email = '${req.body.email}',
                        avatar = '/assets/images/${req.file.completed}'
                     WHERE id = '${req.params.id}';`

                     console.log('données modifié si il y a une image:', sql);
        await query(sql)

        const pathImg = path.resolve("public/images/" + user[0].avatar)

        fs.unlink(pathImg, (err) => {
            if (err) console.log(err);
            else res.redirect('/user')
        })
    }

}

    
//     if (req.body.newPassword) {
//         console.log('données de newPassword :', req.body.newPassword)
//         if (req.file) {
//             console.log('données de file :', req.file);
//             const dbUser = await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
//             const sql = `UPDATE user
//                          SET
//                             name = '${req.body.name}',
//                             email = '${req.body.email}',
//                             password = '${await bcrypt.hash(req.body.newPassword, saltRounds)}',
//                             avatar = '/assets/images/${req.file.completed}'
//                          WHERE id = '${req.params.id}'`

//             await query(sql)
//             const pathImg = path.resolve("public/images/" + dbUser[0].name)
//             fs.unlink(pathImg, (err) => {
//                 if (err) console.log(err);
//                 else res.redirect('/user')
//             })
//             res.redirect('/user')
//             res.end()

//         } else {
//             const sql = `UPDATE user
//                          SET
//                             name = '${req.body.name}',
//                             email = '${req.body.email}',
//                             password = '${await bcrypt.hash(req.body.newPassword, saltRounds)}'
//                          WHERE id = ${req.params.id}`

//             await query(sql)
//             res.redirect('/user')
//             res.end()
//         }
//     } else {
//         if (req.file) {
//             console.log('req file :', req.file)
//             const dbUser = await query(`SELECT * FROM user WHERE id = ${req.params.id}`)
//             const sql = `UPDATE user
//                           SET
//                             name = '${req.body.name}',
//                             email = '${req.body.email}',
//                             avatar = '/assets/images/${req.file.completed}',
//                           WHERE id = ${req.params.id}`

//             await query(sql)
//             pathImg = path.resolve("public/images/" + dbUser[0].name)
//             fs.unlink(pathImg, (err) => {
//                 if (err) console.log(err)
//             })
//             res.redirect('/account')

//         } else {
//             const sql = `UPDATE user
//                          SET
//                             name = '${req.body.name}',
//                             email = '${req.body.email}'
//                          WHERE id = ${req.params.id}`

//             await query(sql)
//             res.redirect('/user')

//         }
//     }
// }