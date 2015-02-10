#!/usr/bin/env node

var optimist = require('optimist');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('../route/svn.js');


//help coomands

	var args = optimist
	  .alias('h', 'help')
	  .alias('h', '?')
	  .options('port', {
	    alias: 'p',
	    string: true,
	    describe: 'The port to run the server on.',
	    default: 4545
	  })
	  .argv;

	if (args.help) {
	  optimist.showHelp();
	  return process.exit(-1);
	}


	//path resolve

	var cwd = __dirname;
 	var resolvepath = cwd.split("/");
 	var indexpath = "";
 

 	for (var i = 1; i < (resolvepath.length-2); i++) {
 		indexpath=indexpath+"/"+resolvepath[i];
 	}


//router
	
	app.listen(args.port);
	app.use(express.static(indexpath +'/client'));
	app.use(bodyParser.urlencoded({ extended: false })); app.use(bodyParser.json()); 
	

	app.all('*', function(req, res, next) {
	  res.set('Access-Control-Allow-Origin', '*');
	  res.set('Access-Control-Allow-Credentials', true);
	  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	  if ('OPTIONS' == req.method) return res.sendStatus(200);
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

 		res.sendFile(indexpath+'/client/index.html');

	});

	console.log('API is starting on port '+args.port);
