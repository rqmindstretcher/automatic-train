const express = require('express');
const jsforce = require('jsforce');

const app = express();
const port = 3001;

// Salesforce credentials
const username = 'noreply@mindstretcher.com';
const password = 'MSLC2023';

// Create a connection to Salesforce
const conn = new jsforce.Connection();

// Connect to Salesforce
conn.login(username, password, function(err, userInfo) {
  if (err) { 
    return console.error(err); 
  }
  console.log('Connected to Salesforce');

  // Perform a simple query to retrieve Account records
  conn.query('SELECT Id, Name FROM Account LIMIT 5', function(err, result) {
    if (err) { 
      return console.error(err); 
    }
    console.log('Fetched Account records:');
    console.log(result.records);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
