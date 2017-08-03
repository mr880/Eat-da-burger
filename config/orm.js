var connection = require('./connection.js');

//helper functions for ORM quries
function sqlPlaceholders(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push('?');
  }
  return arr.toString();
}

function objToSql(obj){
  var arr = [];
  for(var key in obj){
    arr.push(key + '=' + obj[key]);
  }
  return arr.toString();
}



var orm = {
  selectAll: function(tableInput, fn) {
      var queryString = 'SELECT * FROM ' + tableInput + ';';
      connection.query(queryString, function(err, result) {
          if (err) throw err;
          fn(result);
      });
  },

  insertOne: function(table, cols, vals, fn) {
    var queryString = 'INSERT INTO ' + table;

    queryString = queryString + ' (';
    queryString = queryString + cols.toString();
    queryString = queryString + ') ';
    queryString = queryString + 'VALUES (';
    queryString = queryString + sqlPlaceholders(vals.length);
    queryString = queryString + ') ';

    console.log(queryString)

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      fn(result);
    });
  },
  
  updateOne: function(table, objColVals, condition, fn) {
    var queryString = 'UPDATE ' + table;

    queryString = queryString + ' SET ';
    queryString = queryString + objToSql(objColVals);
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    console.log(queryString)
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      fn(result);
    });
  }
};

module.exports = orm
