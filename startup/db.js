const mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'mysql',
  user: 'root',
  password: '999apple%',
  database: 'userauthenticationdb'
});

connection.connect((err) => {
  if(!err) {
    console.log('Database is connected to userauthenticationdb!');
  } else {
    console.log(err);
  }
});

module.exports = {
  connection
}