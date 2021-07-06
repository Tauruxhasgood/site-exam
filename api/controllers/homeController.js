/*
 * Module
 * ****** */
const simulate = require('../simulate.json').reverse().slice(0, 6)

/*
 * Controller
 *************/
exports.get = async (req, res) => {

        const dbArticle = await query(`SELECT * FROM articles`)
        // Reverse permet d'afficher les articles par ordre décroissants et slice permet de limiter le nombre d'articles à 6 
        const reverse = dbArticle.reverse().slice(0, 6)

        console.log('Info de reverse :', reverse)

        res.render('home', {
            dbArticle: reverse
        })
    }