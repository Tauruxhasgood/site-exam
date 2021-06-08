/*
 * Module
 * ****** */ 
const simulate = require('../simulate.json')

/*
 * Controller
 *************/ 
exports.get = (req, res) => {
        // console.log('Page Blog', simulate)
        // const user = {
        //     name: 'Bruno'
        // }
        
        res.render('blog', {
            // user,
            dbArticle: simulate
        })
    }

exports.getID = async (req, res) => {

    // console.log('Page ID:', req.params.id)

    // je définit un objet vide qui permet de stocker ma data
    let artID ={}

    // je créer une boucle pour extraire l'objet ayant l'ID passer en paramètre de l'URL
    await simulate.forEach(art => { if (art.id === req.params.id) artID = art})

    res.render('blogId', {
        artID
    })
}