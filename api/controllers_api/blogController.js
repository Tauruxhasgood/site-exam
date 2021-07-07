/*
 * Module
 * ****** */
const simulate = require('../simulate.json')

/*
 * Controller
 *************/
exports.pageBlog = async (req, res) => {

    const dbArticle = await query(`SELECT * FROM articles`)
    const reverse = dbArticle.reverse()
    
    res.json({
        dbArticle: reverse
    })
}

exports.pageBlogID = async (req, res) => {

    let artIDD = await query(`SELECT * FROM articles WHERE id = "${req.params.id}"`)
    console.log('Info de artIDD :', artIDD);
    let artID = artIDD[0]
    // je créer une boucle pour extraire l'objet ayant l'ID passer en paramètre de l'URL
    // await simulate.forEach(art => { if (art.id === req.params.id) artID = art })

    // var text = '<h2>coucou</h2><p>zfeferfrefef</p><p>fzfreregreg</p>'
    res.render('blogId', {
        // text,
        artID
    })
}

// exports.create = (req, res) => {
//     console.log('Controller CREATE ARTICLE')
//     console.log(req.method)
//     console.log("CREATE body", req.body)

//     // Si case non cocher
//     if (req.body.accept !== 'on') res.render('connexion', { error: 'Vous n\'avez pas accepter les conditions !' })
//     // Si les mot de passe ne sont pas identique
//     else if (req.body.password !== req.body.passwordConfirm) res.render('connexion', { error: 'Vos mot de passe ne correspondent pas !' })
//     // Si tout est ok
//     else {
//         console.log('Tout est ok')
//         res.render('blog', {
//             // user,
//             success: 'Bienvenu ' + req.body.name, 
//             dbArticle: simulate
//         })
//     }
// }

// exports.edit = (req, res) => {
//     console.log('Controller EDIT ARTICLE')

//     console.log(req.method)
//     console.log("EDIT body", req.body)

//     // Si case non cocher
//     if (req.body.accept !== 'on') res.render('connexion', { error: 'Vous n\'avez pas accepter les conditions !' })
//     // Si les mot de passe ne sont pas identique
//     else if (req.body.password !== req.body.passwordConfirm) res.render('connexion', { error: 'Vos mot de passe ne correspondent pas !' })
//     // Si tout est ok
//     else {
//         console.log('Tout est ok')
//         res.render('blog', {
//             // user,
//             success: 'Bienvenu ' + req.body.name, 
//             dbArticle: simulate
//         })
//     }
// }