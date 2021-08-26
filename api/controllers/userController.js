/*
 * Controller
 *************/



exports.get = async (req, res) => {
    res.render('user', {
        userID: await query(`SELECT id,name,email,avatar FROM user WHERE email = '${req.session.user.email}'`),
    })
}