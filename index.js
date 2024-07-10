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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Route to handle form submission (POST request)
app.use(formRouter);

app.get('/', function(req, res) {
    res.render('public/RoeCalculater.html');
});

// Start the server on port 3000
app.listen(3000, () => console.log(`Server listening on port http://localhost:3000`));
