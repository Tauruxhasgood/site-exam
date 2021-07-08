/*
 * Controller
 *************/


const fs = require("fs");
const path = require("path");

exports.get = async (req, res) => {
    // res.status(200).json({message: "Connection OK"})
    // res.render('admin', {
    //     // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
    //     layout: 'adminLayout',
    //     // listUser qui est récupéré dans la boucle #each du partial admin > tableUsers.hbs
    //     listUser: await query('SELECT * FROM user'),
    //     listArticle: await query(`SELECT * FROM articles`)
    // })
    res.json({
        // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
        layout: 'adminLayout',
        // listUser qui est récupéré dans la boucle #each du partial admin > tableUsers.hbs
        listUser: await query('SELECT * FROM user'),
        listArticle: await query(`SELECT * FROM articles`)
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

// Pour créer un article
exports.createArt = async (req, res) => {
    // console.log('Controller add article :', req.body);
    // console.log('fgfr:', req.file)

    let sql = `INSERT INTO articles (title, description, content, author_id) values(?)`;
    let values = [req.body.title, req.body.description, `${req.body.content}`, 1];

    await query(sql, [values])

    // console.log('Données ajouter :', req.file);

    // Modification en RES.JSON pour avoir les informations envoyés sous format JSON
    res.status(200).json([await query(sql, [values])])
    // res.redirect('/admin')
}

// Pour éditer un article
exports.editArticle = async (req, res) => {
    // console.log('Controller Edit article :', req.body)
    // console.log('fgfr:', req.file)

    // if (!req.file) {
    const sql = `UPDATE articles
                      SET title = "${req.body.title}",
                          description = "${req.body.description}",
                          content = "${req.body.content}"
                      WHERE id = "${req.params.id}";`

    console.log('Contenu de content :', req.body.content);

    await query(sql)

    res.json({
        message: await query(`SELECT * FROM articles WHERE id = 88`)
    })
    // res.status(200).json({ message: "Edition de l'article sans image ok" })

    // } else {

    //     const article = await query(`SELECT * FROM articles WHERE id = '${req.params.id}'`)
    //     console.log('info article :', article);

    //     const sql = `UPDATE articles
    //                  SET image = "/assets/images/${req.file.completed}",
    //                     title = "${req.body.title}",
    //                     description = "${req.body.description}",
    //                     content = "${req.body.content}",
    //                     name = "${req.file.completed}"
    //                  WHERE id = "${req.params.id}";`

    //     res.json([await query(sql)])

    //     const pathImg = path.resolve("public/images/" + article[0].name)



    //     fs.unlink(pathImg, (err) => {
    //         if (err) console.log(err);
    //         // else res.status(200).json({ message: "Edition de l'article sans image ok" })

    //     })
    // }
}

// Pour supprimer un article
exports.deleteArticle = async (req, res) => {
    console.log('Controller delete article :', req.body)

    // const article = await query(`SELECT * FROM articles WHERE id = '${req.params.id}'`)
    // console.log('ID article :', req.params.id);

    // const pathImg = path.resolve("public/images/" + article[0].name)
    // console.log('Info pathImg :', pathImg);


    let sql = `DELETE FROM articles WHERE id ='${req.params.id}'`;
    // let id = [req.params.id];

    await query(sql)

    // fs.unlink(pathImg, (err) => {
    //     if (err) console.log(err);
    //     else res.redirect('/admin')
    // })

    // res.json({ message: await query(`SELECT * FROM articles`) })

// Pour supprimer tous les articles
// exports.deleteAllArt = async (req, res) => {
//     console.log('Controller delete All :', req.body);
}