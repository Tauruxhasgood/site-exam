/*
 * Module
 * ****** */ 
const simulate = require('../simulate.json').reverse().slice(0, 6)

/*
 * Controller
 *************/ 
module.exports = {
    get: (req, res) => {
        // console.log('Page Blog', simulate)
        // const user = {
        //     name: 'Bruno'
        // }
        
        res.render('home', {
            // user,
            dbArticle: simulate
        })
    }
}