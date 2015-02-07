
var Client = require('../lib/svncommand.js');
var fs = require('fs');
var async = require('async');
JSON.minify = JSON.minify || require("node-json-minify");
var workingPath = __dirname + '/tmp/copy';

var client = new Client({
    cwd: '/svn'
});


exports.connectsvn = function(req, res) {
	

	var svnparentpath = req.body.svnparentpath || '';
	var AuthUserFile = req.body.AuthUserFile || '';

	
	var jsonmessage={};

	//var svnparentpath="/svn";
	//var authfile="/etc/svnpasswd"

	async.waterfall([
        function(callback) {
           client.checkdir(svnparentpath,function(err, data) {

		    	if(err==null){

		    		callback();
		    	}else{
		    		jsonmessage.success=0;
		    		jsonmessage.message=err.output;
		    		return res.json(200, jsonmessage);
		    	}

			});
        },
        function(callback) {
             client.checkdir(AuthUserFile,function(err, data) {

		    	if(err==null){
		    		jsonmessage.success=1;
		    		jsonmessage.message=data;
		    		return res.json(200, jsonmessage);
		    		callback();
		    	}else{
		    		jsonmessage.success=0;
		    		jsonmessage.message=err.output;
		    		return res.json(200, jsonmessage);
		    	}

			});
        },
    ], function(err, data) {
       //console.log('endddddddddddd');
    });
};




exports.listAlluser = function(req, res) {

	try {

		var authfile="/etc/svnpasswd";
		var jsonmessage={};
		var splituser=[];
		var users=[];

		var userlist = (fs.readFileSync(authfile, {encoding:'utf8'}));
		
		var listarray = userlist.toString().split("\n");
		for(i in listarray){
			splituser=listarray[i].split(':');
			
			if(splituser[0]!=""){
				users.push(splituser[0]);	
			}
			
		}
		//console.log(listarray);
		jsonmessage.success=1;
		jsonmessage.message=users;
		return res.json(200, jsonmessage);
		
	}
	catch(e){
		console.log(e);
		return res.json(200, e);
	}
}

exports.adduser = function(req, res) {

	var filepath ="/etc/svnpasswd";

	var username = req.body.username || '';
	var password = req.body.password || '';
	var jsonmessage ={};
  
	client.adduser(filepath,username,password,function(err, data) {
		
		
		if(err==null||err.code==0){

			jsonmessage.success=1;
		    jsonmessage.message=data;

		    return res.json(200, jsonmessage);

		}else{

			jsonmessage.success=0;
		    jsonmessage.message=err.output;

		    return res.json(200, jsonmessage);
		}

	});
}

exports.deleteuser = function(req, res) {

	var filepath ="/etc/svnpasswd";
	var username = "user9";
	
  
	client.deleteuser(filepath,username,function(err, data) {
		
		if(err==null){

			jsonmessage.success=1;
		    jsonmessage.message=data;
		    return res.json(200, data);

		}else{

			jsonmessage.success=0;
		    jsonmessage.message=err.output;
		    return res.json(200, err.output);
		}

	});
}


exports.deleterespository = function(req, res) {

	var svnpath="/svn/repos2";

	client.deleterespository(svnpath,function(err, data) {

		if(err==null){
		    return res.json(200, data);
		}else{
		    return res.json(200, err.output);
		}

	});
}

exports.newrespository = function(req, res) {

	//var svnpath="/svn/repos5";
	var svnpath = "/svn/"+req.body.respositoryname || '';
	var jsonmessage = {};

	client.newrespository(svnpath,function(err, data) {


		if(err==null){

			var listrespository = data.toString().split("\n");
			jsonmessage.success=1;
		    jsonmessage.message=listrespository;
		    return res.json(200, jsonmessage);

		}else{
			jsonmessage.success=0;
		    jsonmessage.message=err.output;
		    return res.json(200,jsonmessage);
		}

	});
}

exports.listAllrespository = function(req, res) {

	var svnpath="/svn";
	var jsonmessage={};

	client.listAllrespository(svnpath,function(err, data) {

		if(err==null){

			var listrespository = data.toString().split("\n");
			jsonmessage.success=1;
		    jsonmessage.message=listrespository;
		    return res.json(200, jsonmessage);

		}else{
			jsonmessage.success=1;
		    jsonmessage.message=err.output;
		    return res.json(200, jsonmessage);
		}

	});
}

exports.respositorydetails = function(req, res) {

	var svnpath="file:///svn/repos5";

	client.respositorydetails(svnpath,function(err, data) {

		if(err==null){

			var listrespository = data.toString().split("\n");
		    return res.json(200, listrespository);

		} else {
		    return res.json(200, err.output);
		}

	});
}