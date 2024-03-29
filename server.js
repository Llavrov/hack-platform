'use strict'

const express = require('express')
// const path = require('path')
const serveStatic = require('serve-static')
const app = express()
app.use(serveStatic(__dirname))

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port is ${port}`);
})
