/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    upload = require('./config/multer'),
    path = require('path')


/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    blogController = require('./controllers/blogController'),
    // blogIdController = require('./controllers/blogIdController'),
    contactController = require('./controllers/contactController'),
    adminController = require('./controllers/adminController'),
    userController = require('./controllers/userController'),
    connexionController = require('./controllers/connexionController'),
    feedController = require('./controllers/rssController'),
    nodemailerController = require('./controllers/nodemailerController')

/*
 * Router
 ***********/

// HOME
router.route('/')
    .get(homeController.get)


// BLOG

// - Blog
router.route('/blog')
    .get(blogController.pageBlog)

// - Blog
router.route('/article')
    // .post(blogController.create)
    .put(blogController.edit)

// - BlogId
router.route('/article/:id')
    .get(blogController.pageBlogID)

// CONTACT
router.route('/contact')
    .get(contactController.get)

// ADMIN
// USER
router.route('/admin')
    .get(adminController.get)

router.route('/deleteOne/:id')
    .delete(adminController.deleteOneUser)

router.route('/editOne/:id')
    .put(adminController.editOneUser)

// ARTICLE
router.route('/editArticle/:id')
    .put(upload.single('imgArticle'), adminController.editArticle)

router.route('/addArticle')
    .post(upload.single('imgArticle'), adminController.createArt)

router.route('/deleteOneArt/:id')
    .delete(adminController.deleteArticle)

// USER
router.route('/user')
    .get(userController.get)

//CONNEXION
router.route('/connexion')
    .get(connexionController.get)

router.route('/logout')
    .get(connexionController.logout)

// - S'enregistrer
router.route('/register')
    .post(connexionController.create)



// - Se connecter
router.route('/login')
    .post(connexionController.login)

// NODEMAILER
// email TEST

// router.route('/nodemailerTest')
//     .post(nodemailerController.test)

// email de VERIFICATION
router.route('/verification')
    .post(nodemailerController.sendVerif)

router.route('/verification/:id')
    .get(connexionController.verificationMail)
    .post(connexionController.verificationMailPost)

// vérif email et update password
router.route('/editPassword/:id')
    .get(nodemailerController.verifMail)
    .post(nodemailerController.updatePassword)

// FEED
router.route('/feed')
    .get(feedController.get)
/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;