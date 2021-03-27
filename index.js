const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const {PORT} = require('./config');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

app.use(router);

app.listen(PORT, () => {
    console.log(`${PORT} is working...`);
});
