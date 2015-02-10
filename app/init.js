var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder



app.listen(4545);
app.use(express.static(__dirname + '/client'));
app.use(bodyParser());


//Routes


var routes = require('./server/route/svn.js');

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

//Get all published post
app.post('/connectsvn', routes.connectsvn);

app.post('/listAllrespository', routes.listAllrespository);
app.post('/listAlluser', routes.listAlluser);

app.post('/adduser', routes.adduser);
app.post('/deleteuser', routes.deleteuser);

app.post('/respositorydetails', routes.respositorydetails);
app.post('/newrespository', routes.newrespository);

app.post('/deleterespository', routes.deleterespository); 

//client page

app.get('/', function(req, res) {

    res.sendfile('client/index.html')
});

console.log('Blog API is starting on port 4545');