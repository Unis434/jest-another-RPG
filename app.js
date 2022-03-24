// dependencies
// dependencies for routes
const apiRoutes = requirere('./lib/Game');
new Game().initializeGame();

const fs = require('fs');
const path = require('path');
const express = require('express');
// requiring data
const {Game} = require('./lib/Game');

// sets an environment variable for port
const PORT = process.env.PORT || 5500;

// to instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());
// instruct the server to make certain files readily available
app.use(express.static('lib'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// add routes
// app.get('/',(req, res) => {
//     res.json({message: 'Hello World!'})
// });

// to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});
