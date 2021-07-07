/*
 * Controller
 *************/ 


// module.exports = {
//     get: (req, res) => {
//         res.render('blogId')
//     }
// }

// if (!req.file) {

//     // condition pour verifier que nous avons un title dans le formulaire
//     if (req.body.title) {
//       // Ici nous éditons le titre de notre Article selectionner grace à query
//       Article.updateOne( query, {
//         title: req.body.title
//       // et notre callback d'error
//       }, (err) => {
//         if (err) res.redirect('/')
//         else res.redirect('/article')
//       })
//     } else res.redirect('/')

//   // Sinon (Donc si nous avonc un fichier (image) dans notre formulaire)
//   } else {
//     // Ici nous éditons notre article selectionner grâce à query
//     Article.updateOne( query, {
//       // on récupère tout notre req.body
//       ...req.body,
//       // ici on viens stocker le chemin de l'image dans la DB
//       imgArticle: `/assets/images/${req.file.completed}`,
//       // Ici on stock le nom de l'image dans notre DB
//       name: req.file.completed
//     // Notre callback d'error
//     }, (err) => {
//       if (err) console.log(err)

//       // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
//       fs.unlink( pathImg, (err) => {
//         if (err) console.log(err)
//         //  Ici notre ancienne image viens d'etre supprimer
//         else res.redirect('/article')

//       })
//     })
//   }