/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
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
    feedController = require('./controllers/rssController')

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
    .delete(adminController.deleteOne)

router.route('/editOne/:id')
    .put(adminController.editOne)

    // ARTICLE
router.route('/EditArticle/:id')
    .put(adminController.editArticle)

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

// - MDP lost
router.route('/lostPassword')
    .post(connexionController.lostPassword)

// FEED
router.route('/feed')
    .get(feedController.get)
/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;