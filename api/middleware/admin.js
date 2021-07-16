
// Permet de checker si la session est admin et si OUI, donne accès à la page admin
module.exports = (req, res, next) => {
    // console.log('Middleware', req.session)
    if (req.session.isAdmin === true) next()
    else res.redirect('/')
}