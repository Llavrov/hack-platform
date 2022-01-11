'use strict'

const express = require('express');
const body = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(body.json());

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port is ${port}`);
})