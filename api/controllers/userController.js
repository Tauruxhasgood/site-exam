/*
 * Controller
 *************/





exports.get = async (req, res) => {
    res.render('user', {
        userID: await query(`SELECT id,name,email,avatar FROM user WHERE email = '${req.session.user.email}'`),
        userComments: await query(`SELECT comments.id, comments.title, comments.content, user.name
                                   FROM comments
                                   LEFT JOIN user
                                   ON user.id = comments.author_id
                                   WHERE author_id = ${req.session.user.id}`),
    })
}

exports.modifyComment = async (req, res) => {
    console.log(req.body);
    const sql =  `UPDATE comments
                  SET content = "${req.body.content}"
                  WHERE id = "${req.params.id}";`
    console.log('contenu de content :', req.body.content);
    await query (sql)

    res.redirect('/user')
}