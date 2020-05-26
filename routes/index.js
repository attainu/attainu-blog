var express = require('express');
var router = express.Router();
var UserController = require('../controller/user.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    // if the user is logged in redirect to home page
    res.redirect('/home');
  } else {
    // if the user is not logged in redirect to home page
    res.redirect('/login');
  }
});


router.get('/login', function (req, res) {
  res.render('login.hbs');
});

router.post('/login', function (req, res) {
  return UserController.login(req, res);
});

router.get('/signup', function (req, res) {
  res.render('signup.hbs');
});

router.post('/signup', function (req, res) {
  return UserController.signUp(req, res)
});

router.get('/home', function (req, res) {
  return UserController.home(req, res);
})

router.get('/add', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login')
  }

  var data = {
    loggedInUser: req.session.user
  };

  if (req.query.success) {
    data.postAdded = true;
  }

  res.render('add.hbs', data)
});


router.post('/add', function (req, res) {
  return UserController.add(req, res);
});

router.get('/edit/:id', function(req, res){
  return UserController.edit(req, res);
});


router.post('/edit/:id', function(req, res){
  return UserController.update(req, res);
})



module.exports = router;
