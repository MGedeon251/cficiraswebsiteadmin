const mysql= require ('mysql')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cficiras_bd'
  });
function getConnexion() {
    return connection;
}
connection.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log('Base de donnée connecté!');
});
  
  module.exports = connection;