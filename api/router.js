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
    connexionController = require('./controllers/connexionController'),
    feedController = require('./controllers/rssController')

/*
 * Router
 ***********/

// Home
router.route('/')
    .get(homeController.get)

// Blog
router.route('/blog')
    .get(blogController.pageBlog)

// Blog
router.route('/article')
    // .post(blogController.create)
    .put(blogController.edit)

// BlogId
router.route('/article/:id')
    .get(blogController.pageBlogID)

// Contact
router.route('/contact')
    .get(contactController.get)

// Admin
router.route('/admin')
    .get(adminController.get)

router.route('/deleteOne/:id')
    .delete(adminController.deleteOne)

router.route('/editOne/:id')
    .put(adminController.editOne)

//Connexion
router.route('/connexion')
    .get(connexionController.get)

// S'enregistrer
router.route('/register')
    .post(connexionController.create)

// Connexion
router.route('/login')
    .post(connexionController.login)

// MDP lost
router.route('/lostPassword')
    .post(connexionController.lostPassword)

// Feed
router.route('/feed')
    .get(feedController.get)
/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;