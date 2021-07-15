/*
 * Controller
 *************/

exports.pageBlogID = async (req, res) => {

    if (!req.session.user) {
        res.render('blog', {
            error: 'Vous devez être connecté pour accéder aux détails du voyage'
        })
    } else {
        // artIDD récupère les informations de l'article selectionner
        let artIDD = await query(`SELECT * FROM articles WHERE id = "${req.params.id}"`)
        let dbComments = await query(`SELECT user.name, comments.content, comments.id
                                      FROM user
                                      LEFT JOIN comments
                                      ON user.id = comments.author_id
                                      WHERE article_id = ${req.params.id};`)
        
        // console.log('Info de artIDD :', artIDD);
        let artID = artIDD[0]
        // je créer une boucle pour extraire l'objet ayant l'ID passer en paramètre de l'URL
        // await simulate.forEach(art => { if (art.id === req.params.id) artID = art })

        // var text = '<h2>coucou</h2><p>zfeferfrefef</p><p>fzfreregreg</p>'
        res.render('blogId', {
            // text,
            artID,
            dbComments
            
        })
    }
}


