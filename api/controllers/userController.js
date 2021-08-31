/*
 * Controller PANNEAU USER
 *************/
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.get = async (req, res) => {
    const userID = await query(`SELECT id,name,email,avatar FROM user WHERE email = '${req.session.user.email}'`)

    console.log('get myaccount', req.session, userID)
    res.render('user', {
        userID: userID[0],
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
    console.log('données avant if :', req.body, req.params);

    if (!req.file) {
        let userID = await query(`SELECT id,name,email,avatar,nameAvatar FROM user WHERE id = '${req.params.id}'`)
        console.log('not file', userID)
        const sql = `UPDATE user
                     SET 
                        name = '${req.body.name}',
                        email = '${req.body.email}'
                     WHERE id = '${req.params.id}';`

        await query(sql)
        // res.redirect('/user')

        req.session.user.email = req.body.email
        req.session.user.name = req.body.name

        res.render('user', {
            userID: req.session.user,
            userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                       FROM comments
                                       LEFT JOIN user
                                       ON user.id = comments.author_id
                                       WHERE author_id = ${req.session.user.id}`),
        })

    } else {
        console.log('with file',)
        let userIDOld = await query(`SELECT id,name,email,avatar,nameAvatar FROM user WHERE id = '${req.params.id}'`)

        const sql = `UPDATE user
                     SET
                        name = '${req.body.name}',
                        email = '${req.body.email}',
                        avatar = '/assets/images/${req.file.completed}',
                        nameAvatar = '${req.file.completed}'
                     WHERE id = '${req.params.id}';`


        await query(sql)

        let userID = await query(`SELECT id,name,email,avatar,nameAvatar FROM user WHERE id = '${req.params.id}'`)
        console.log('with file 2', userIDOld[0].nameAvatar, req.file)

        if (userIDOld[0].avatar) {
            const pathImg = path.resolve("public/images/" + userIDOld[0].nameAvatar)

            fs.unlink(pathImg, (err) => {
                if (err) console.log(err);

            })
        }

        req.session.user.email = req.body.email

        res.render('user', {
            userID: userID[0],
            userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                       FROM comments
                                       LEFT JOIN user
                                       ON user.id = comments.author_id
                                       WHERE author_id = ${req.session.user.id}`),
        })
    }
}

exports.changePassword = async (req, res) => {
    // console.log('données avant if:', req.body);
    if (req.body.newPassword) {
        console.log('données de req.body.newPassword:', req.body.newPassword);
        const encryptedPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
        
        console.log('Données de encryptedPassword:' , encryptedPassword);

        let sql = `UPDATE user
                     SET password = '${encryptedPassword}'
                     WHERE id = '${req.params.id}';`

                
        
        await query(sql, encryptedPassword)

        res.redirect('/user', {
            // success: "Votre mot de passe a été modifié avec succès !"
        })

        // req.session.user.email = req.body.email
        // req.session.user.name = req.body.name

        // res.render('user', {
        //     userID: req.session.user,
        //     userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
        //                                FROM comments
        //                                LEFT JOIN user
        //                                ON user.id = comments.author_id
        //                                WHERE author_id = ${req.session.user.id}`),
        //     success: "Votre mot de passe a été modifié avec succès !"
        // })
    } else {
        
        res.render('user', {
            userID: req.session.user,
            userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                       FROM comments
                                       LEFT JOIN user
                                       ON user.id = comments.author_id
                                       WHERE author_id = ${req.session.user.id}`),
        })
    }
}
