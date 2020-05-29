const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

console.log(__dirname );
app.use(express.static(__dirname + '/'));
console.log(__dirname );

router.get('/',function(req,res){
  res.render(path.join(__dirname+"/index.html"));
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);

module.exports = app;
