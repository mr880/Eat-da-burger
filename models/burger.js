var orm = require('../config/orm.js');

var burger = {
  all: function(fn){
    orm.selectAll('burgers', function(res){
      fn(res)
    })
  },
  create: function(cols, vals, fn){
    orm.insertOne('burgers', cols, vals, function(res){
      fn(res);
    })
  },
  update: function(objColVals, condition, fn){
    orm.updateOne('burgers', objColVals, condition, function(res){
      fn(res);
    })
  }
}

module.exports = burger
