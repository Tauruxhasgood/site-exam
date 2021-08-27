/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    path = require('path');


/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    blogController = require('./controllers/blogController'),
    blogIdController = require('./controllers/blogIdController'),
    commentsController = require('./controllers/commentsController'),
    contactController = require('./controllers/contactController'),
    adminController = require('./controllers/adminController'),
    userController = require('./controllers/userController'),
    connexionController = require('./controllers/connexionController'),
    feedController = require('./controllers/rssController'),
    nodemailerController = require('./controllers/nodemailerController'),
    mentionController = require('./controllers/mentionController');

/*
 * Middleware
 * ********** */
const upload = require('./config/multer');
// const faisant appel au middleware admin.js et déclarer dans le .get de ADMIN
const isAdmin = require('./middleware/admin');

/*
 * Router
 ***********/

// HOME
router.route('/')
    .get(homeController.get)


// BLOG / COMMENTS
// --------------------

// - Articles
router.route('/blog')
    .get(blogController.pageBlog)

// - ArticleId
router.route('/article/:id')
    .get(blogIdController.pageBlogID)
    .post(commentsController.createComments)


// CONTACT
// --------------------
router.route('/contact')
    .get(contactController.get)

// ADMIN
// --------------------
// - User
router.route('/admin')
    .get(isAdmin, adminController.get)

router.route('/deleteOne/:id')
    .delete(isAdmin, adminController.deleteOneUser)

router.route('/editOne/:id')
    .put(isAdmin, adminController.editOneUser)

// - Articles
router.route('/editArticle/:id')
    .put(isAdmin, upload.single('imgArticle'), adminController.editArticle)

router.route('/addArticle')
    .post(isAdmin, upload.single('imgArticle'), adminController.createArt)

router.route('/deleteOneArt/:id')
    .delete(isAdmin, adminController.deleteArticle)

// - Comments
router.route('/deleteOneComments/:id')
    .delete(isAdmin, adminController.deleteComments)

router.route('/deleteMultiComments')
    .post(adminController.deleteMultiComments)

// USER
// --------------------
router.route('/user')
    .get(userController.get)

router.route('/comment/:id')
    .put(userController.modifyComment)

//CONNEXION
// --------------------
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
// --------------------
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
// --------------------
router.route('/feed')
    .get(feedController.get)

// MENTION LEGALE
router.route('/mention')
    .get(mentionController.get)

/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;