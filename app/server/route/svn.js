
var Client = require('../lib/svncommand.js');
var fs = require('fs');
var async = require('async');
JSON.minify = JSON.minify || require("node-json-minify");
var workingPath = __dirname + '/tmp/copy';

var client = new Client({
    cwd: '/svn'
});


exports.connectsvn = function(req, res) {
	

	var svnpath="/svn";
	var authfile="/etc/svnpasswd"

	async.waterfall([
        function(callback) {
           client.checkdir(svnpath,function(err, data) {

		    	if(err==null){
		    		callback();
		    	}else{
		    		return res.json(200, err.output);
		    	}

			});
        },
        function(callback) {
             client.checkdir(authfile,function(err, data) {

		    	if(err==null){
		    		return res.json(200, data);
		    		callback();
		    	}else{
		    		return res.json(200, err.output);
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
		var userlist = (fs.readFileSync(authfile, {encoding:'utf8'}));
		
		var listarray = userlist.toString().split("\n");
		return res.json(200, listarray);
		
	}
	catch(e){
		console.log(e);
		return res.json(200, e);
	}
}

exports.adduser = function(req, res) {

	var filepath ="/etc/svnpasswd";
	var username = "user5";
	var password = 'sas123#';
  
	client.adduser(filepath,username,password,function(err, data) {
		
		if(err==null){
		    return res.json(200, data);
		}else{
		    return res.json(200, err.output);
		}

	});
}

exports.deleteuser = function(req, res) {

	var filepath ="/etc/svnpasswd";
	var username = "user9";
	
  
	client.deleteuser(filepath,username,function(err, data) {
		
		if(err==null){
		    return res.json(200, data);
		}else{
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

	var svnpath="/svn/repos5";

	client.newrespository(svnpath,function(err, data) {


		if(err==null){

			var listrespository = data.toString().split("\n");
		    return res.json(200, listrespository);

		}else{

		    return res.json(200, err.output);
		}

	});
}

exports.listAllrespository = function(req, res) {

	var svnpath="/svn";

	client.listAllrespository(svnpath,function(err, data) {

		if(err==null){

			var listrespository = data.toString().split("\n");
		    return res.json(200, listrespository);

		}else{
		    return res.json(200, err.output);
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