

exports.createComments = async (req, res) => {
    console.log(req.body);
    
    let sql = `INSERT INTO comments (content, author_id, title, name) VALUES (?)`;
    let values = [req.body.content, 1, req.body.title, req.body.name];

    console.log('Données user.id :', req.session.user.id);

    await query(sql, [values])
    res.redirect('/article/${req.body.blogId}')
}


