/*
 * Module
 * ****** */
const simulate = require('../simulate.json')

/*
 * Controller
 *************/
exports.pageBlog = (req, res) => {
    // console.log('Page Blog', simulate)
    // const user = {
    //     name: 'Bruno'
    // }

    res.render('blog', {
        // user,
        dbArticle: simulate
    })
}

exports.create = (req, res) => {
    console.log('Controller CREATE ARTICLE')
    console.log(req.method)
    console.log("CREATE body", req.body)

    // Si case non cocher
    if (req.body.accept !== 'on') res.render('connexion', { error: 'Vous n\'avez pas accepter les conditions !' })
    // Si les mot de passe ne sont pas identique
    else if (req.body.password !== req.body.passwordConfirm) res.render('connexion', { error: 'Vos mot de passe ne correspondent pas !' })
    // Si tout est ok
    else {
        console.log('Tout est ok')
        res.render('blog', {
            // user,
            success: 'Bienvenu ' + req.body.name, 
            dbArticle: simulate
        })
    }
}

exports.edit = (req, res) => {
    console.log('Controller EDIT ARTICLE')

    console.log(req.method)
    console.log("EDIT body", req.body)

    // Si case non cocher
    if (req.body.accept !== 'on') res.render('connexion', { error: 'Vous n\'avez pas accepter les conditions !' })
    // Si les mot de passe ne sont pas identique
    else if (req.body.password !== req.body.passwordConfirm) res.render('connexion', { error: 'Vos mot de passe ne correspondent pas !' })
    // Si tout est ok
    else {
        console.log('Tout est ok')
        res.render('blog', {
            // user,
            success: 'Bienvenu ' + req.body.name, 
            dbArticle: simulate
        })
    }
}

exports.pageBlogID = async (req, res) => {

    // console.log('Page ID:', req.params.id)

    // je définit un objet vide qui permet de stocker ma data
    let artID = {}

    // je créer une boucle pour extraire l'objet ayant l'ID passer en paramètre de l'URL
    await simulate.forEach(art => { if (art.id === req.params.id) artID = art })

    res.render('blogId', {
        artID
    })
}