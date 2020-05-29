const app = require('express')();
var http = require('http').createServer(app);
const viewTemplate = require('./index');

app.use(viewTemplate)



module.exports = http;