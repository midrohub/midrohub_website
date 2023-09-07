var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var app = express();

var index = require('./routes/index');
var admin = require('./routes/admin');

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);


const server = app.listen(process.env.PORT || 7000, () => {
    console.log(`Express running on port ${server.address().port}`);
})