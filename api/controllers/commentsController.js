

exports.createComments = async (req, res) => {
    console.log(req.body);

    // const articleID = await query(`SELECT * FROM articles WHERE id = '${req.params.id}'`)
    
    let sql = `INSERT INTO comments (content, author_id, title, name, article_id) VALUES (?)`;
    let values = [req.body.content, req.session.user.id, req.body.title, req.body.name, req.params.id];

    console.log('Données values :', values);

    await query(sql, [values])

    // let articleParentComment = `SELECT * FROM comments WHERE id = '${req.params.id}';`

    res.redirect(`/blog`)
    console.log('info res rdirect :', req.params.id);
}


