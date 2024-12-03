const mysql = require('mysql');
const fs = require('fs');

// MySQL database configuration
const dbConfig = {
    host: "10.0.0.64",
    user: "ManojV.cellmaapi",
    password: "Welcome@123",
    port:3310,
    database: "cellma4_api",
    connectionLimit: 10
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');  
  const query = 'SELECT * FROM patients where pat_firstname="meher" && pat_surname="Riomedtest"';
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    const jsonData = JSON.stringify(results, null, 2);
    const fileName = '../../Riomed/Cellma4Automation/TestData/AppointmentDomain/SearchPatientDetailsQueryResult1.json';
    fs.writeFile(fileName, jsonData, (err) => {
      if (err) {
        console.error('Error writing JSON to file:', err);
        return;
      }
      console.log(`Data saved to ${fileName}`);
    });
    connection.end();
  });
});
