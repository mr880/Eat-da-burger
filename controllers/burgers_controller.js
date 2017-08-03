
var express = require('express');
var router = express.Router();
var burgers = require('../models/burger.js');

router.get('/', function(req,res){
  res.redirect('/burgers');
});

router.get('/burgers', function(req,res){
  burgers.all(function(data){
    var handlebarObj = {burgers:data};
    console.log(handlebarObj);
    res.render('index', handlebarObj);
  })
});

router.post('/burgers/new', function(req,res){
  burgers.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured],function(data){
    res.redirect('/burgers');
  })
});

router.put('/burgers/update/:id', function(req, res){
  var condition = 'id = ' + req.params.id;
  console.log('condition: ', condition);
  burgers.update({'devoured' : req.body.devoured}, condition,function(data){
    res.redirect('/burgers');
  })
});

module.exports = router;
