
var Client = require('../lib/svncommand.js');
var fs = require('fs');
var async = require('async');

var client = new Client({
    cwd: '/svn'
});


exports.connectsvn = function(req, res) {
	

	var svnparentpath = "/"+req.body.svnparentpath || '';
	var AuthUserFile = "/"+req.body.AuthUserFile || '';

	
	var jsonmessage={};

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
    });
};




exports.listAlluser = function(req, res) {

	try {

		var authfile="/"+req.body.authuserfile || '';
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

	
	var authfile="/"+req.body.authuserfile || '';

	var username = req.body.username || '';
	var password = req.body.password || '';
	var jsonmessage ={};
  
	client.adduser(authfile,username,password,function(err, data) {
		
		
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

	
	var authfile = "/"+req.body.authuserfile || '';
	var username = req.body.username || '';
	var jsonmessage={};
	
	
	client.deleteuser(authfile,username,function(err, data) {
		
		
		if(err==null||err.code==0){

			jsonmessage.success=1;
		    jsonmessage.message=data;
		    return res.json(200, data);

		}else{

			jsonmessage.success=0;
		    jsonmessage.message=err.output;
		    return res.json(200, jsonmessage);
		}

	});
}


exports.deleterespository = function(req, res) {

	
	var svnpath="/"+req.body.svnparentpath+"/" || '';
	var respospath = svnpath+req.body.respositoryname || '';
	var jsonmessage = {};

	

	client.deleterespository(respospath,function(err, data) {

		if(err==null){
			jsonmessage.success=1;
		    jsonmessage.message=data;
		    return res.json(200, jsonmessage);
		}else{jsonmessage
			jsonmessage.success=1;
		    jsonmessage.message=err.output;
		    return res.json(200, jsonmessage);
		}

	});
}

exports.newrespository = function(req, res) {

	var svnpath="/"+req.body.svnparentpath+"/" || '';
	var respospath = svnpath+req.body.respositoryname || '';
	
	var jsonmessage = {};

	client.newrespository(respospath,function(err, data) {

	
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

	var svnpath="/"+req.body.svnparentpath || '';
	var jsonmessage={};

	client.listAllrespository(svnpath,function(err, data) {

		if(err==null){

			var listrespository = data.toString().split("\n");
			jsonmessage.success=1;
		    jsonmessage.message=listrespository;
		    return res.json(200, jsonmessage);

		}else{
			jsonmessage.success=0;
		    jsonmessage.message=err.output;
		    return res.json(200, jsonmessage);
		}

	});
}

exports.respositorydetails = function(req, res) {

	var svnpath="file:///"+req.body.svnparentpath+"/" || '';
	var respospath = svnpath+req.body.respositoryname || '';

	var splitrepos = [];
	var date="";
	var foldername=[];

	var folderdata = [];

	var jsonmessage={};


	client.respositorydetails(respospath,function(err, data) {

		if(err==null){

			var listrespository = data.toString().split("\n");
			//console.log(data);
			

			for(i in listrespository){
				
				splitrepos=listrespository[i].split('     ');

				if(splitrepos.length>1){

		
				
					foldername=splitrepos[3].split(' ');
					date=foldername[3]+' '+foldername[4]+' '+foldername[5]+' '+foldername[6];

					folderdata[i]=[date,foldername[7]];
				}
				
			}
			
			jsonmessage.success=1;
		    jsonmessage.message=folderdata;
		    return res.json(200, jsonmessage);

		} else {
			jsonmessage.success=0;
		    jsonmessage.message=err.output;
		    return res.json(200, jsonmessage);
		}

	});
}