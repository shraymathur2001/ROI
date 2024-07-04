// Requiring the module 
const express = require('express');
const bodyParser = require('body-parser');
const formRouter = require('./routes/formRoute');

const app = express();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));
// Route to handle form submission (POST request)
app.use(formRouter);


// Start the server on port 3000
app.listen(3000, () => console.log(`Server listening on port http://localhost:3000`));