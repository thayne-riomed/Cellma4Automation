// db.js
import { createConnection } from 'mysql';
//require('dotenv').config();


function connectToDatabase() {
  const connection = createConnection({
    host: '10.0.0.64',
    user: "ManojV.cellmaapi",
    password: "Welcome@123",
    port:3310,
    database: "cellma4_api"
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  return connection;
}

function executeQuery(query) {
  console.log('Added for testing');
  return new Promise((resolve, reject) => {
    const connection = connectToDatabase();
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

export default { connectToDatabase, executeQuery };
