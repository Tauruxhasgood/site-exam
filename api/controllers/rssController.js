

/*
 * Controller
 *************/ 
module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('feed', {layout: false})
    }
}
