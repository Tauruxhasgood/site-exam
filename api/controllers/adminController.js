/*
 * Controller PANNEAU ADMIN
 *************/


const fs = require("fs");
const path = require("path");

exports.get = async (req, res) => {
    res.render('admin', {
        // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
        layout: 'adminLayout',
        // listUser qui est récupéré dans la boucle #each du partial admin > tableUsers.hbs
        listUser: await query('SELECT * FROM user'),
        listArticle: await query(`SELECT * FROM articles`),
        listComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                   FROM comments
                                   LEFT JOIN user
                                   ON user.id = comments.author_id`),
        defaultActived: true
    })
}

// CONTROLLER POUR GERER LES UTILISATEURS

exports.deleteOneUser = async (req, res) => {

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

exports.editOneUser = async (req, res) => {
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

// CONTROLLER POUR GERER LES ARTICLES

// - Pour éditer un article
exports.editArticle = async (req, res) => {
    console.log('Controller Edit article :', req.body)

    if (!req.file) {
        const sql = `UPDATE articles
                      SET title = "${req.body.title}",
                          description = "${req.body.description}",
                          content = "${req.body.content}"
                      WHERE id = "${req.params.id}";`

        console.log('Contenu de content :', req.body.content);

        await query(sql)
        res.redirect('/admin')

    } else {

        const article = await query(`SELECT * FROM articles WHERE id = '${req.params.id}'`)
        console.log('info article :', article);

        const sql = `UPDATE articles
                     SET image = "/assets/images/${req.file.completed}",
                        title = "${req.body.title}",
                        description = "${req.body.description}",
                        content = "${req.body.content}",
                        name = "${req.file.completed}"
                     WHERE id = "${req.params.id}";`

        await query(sql)

        const pathImg = path.resolve("public/images/" + article[0].name)

        fs.unlink(pathImg, (err) => {
            if (err) console.log(err);
            else res.redirect('/admin')
        })
    }
}

// - Pour créer un article
exports.createArt = async (req, res) => {
    console.log('Controller add article :', req.body);

    let sql = `INSERT INTO articles (image, title, description, content, author_id, name) values(?)`;
    let values = [`/assets/images/${req.file.completed}`, req.body.title, req.body.description, `${req.body.content}`, 1, `${req.file.completed}`];

    console.log('Données ajouter :', req.file);

    await query(sql, [values])
    res.redirect('/admin')
}

// - Pour supprimer un article
exports.deleteArticle = async (req, res) => {
    console.log('Controller delete article :', req.body)

    const article = await query(`SELECT * FROM articles WHERE id = '${req.params.id}'`)
    console.log('ID article :', req.params.id);

    const pathImg = path.resolve("public/images/" + article[0].name)
    console.log('Info pathImg :', pathImg);


    let sql = `DELETE FROM articles WHERE id ='${req.params.id}'`;
    
    await query(sql)

    fs.unlink(pathImg, (err) => {
        if (err) console.log(err);
        else res.redirect('/admin')
    })

    // res.redirect('/admin')
}

// CONTROLLER POUR GERER LES COMMENTAIRES

// - Pour supprimer un commentaires
exports.deleteComments = async (req, res) => {
    

    let sql = `DELETE FROM comments WHERE id = ?`;
    let id = [req.params.id];
    await query(sql, [id])
    res.redirect('/admin')
}


// - Pour supprimer tous les commentaires
exports.deleteMultiComments = async (req, res) => {
    console.log('Données de suppresion :', typeof req.body, req.body);

    // console.log('length: ', req.body['data[]'].length)

    req.body['data[]'].forEach(async id => await query(`DELETE FROM comments WHERE id = '${id}'`));

    // for (const [key, value] of Object.entries(req.body['data[]'])) {
    //     console.log(`ObjectEntries: ${key}: ${value}`);
    // }

    res.render('admin', {
        // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
        layout: 'adminLayout',
        // listUser qui est récupéré dans la boucle #each du partial admin > tableUsers.hbs
        listUser: await query('SELECT * FROM user'),
        listArticle: await query(`SELECT * FROM articles`),
        listComments: await query(`SELECT * FROM comments`),
        commentActived: true
    })

}


