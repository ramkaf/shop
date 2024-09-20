const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Path to your SQL file
const sqlFilePath = path.join(__dirname, 'path_to_your_sql_file.sql');

// Read the SQL file
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

// Database details
const databaseName = 'ostan';
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '321165'
};

// Create a MySQL connection
const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Step 1: Create the database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
    if (err) {
      connection.end();
      throw err;
    }
    console.log(`Database ${databaseName} created or already exists`);

    // Step 2: Use the newly created or existing database
    connection.query(`USE ${databaseName}`, (err) => {
      if (err) {
        connection.end();
        throw err;
      }
      console.log(`Using database ${databaseName}`);

      // Step 3: Execute the SQL file
      connection.query(sqlQuery, (err, results) => {
        if (err) {
          connection.end();
          throw err;
        }
        console.log('SQL file executed successfully');
        console.log(results);
        connection.end();
      });
    });
  });
});
