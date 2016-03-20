var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register',function(req, res){
  res.render('register',{ });
});
router.post('/register', function(req, res){
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    console.log(err);
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});
router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});
module.exports = router;
