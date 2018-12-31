const mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: '999apple%',
  database: 'userauthenticationdb'
});

connection.connect((err) => {
  if(!err) {
    console.log('Database is connect to userauthenticationdb!');
  } else {
    console.log(err);
  }
});

module.exports = {
  connection
}