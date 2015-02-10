'use strict';

var async = require('async');
var fs = require('fs');
var spawn = require('child_process').spawn;

var paramsoptions={

};

var Client = function() {
   
  
};

function checkSuccess (outputData, code, errorData) {
    return code === 0 && errorData === '';
}

//util.inherits(Client, Spawn);

Client.prototype.cmd = function(paramsoptions, callback) {
   
        var outputData=[];
        var errorData =[];
       
        var program=paramsoptions.program;
        var command=paramsoptions.command;

        var spawnprocess = spawn(program,command);

        spawnprocess.on('error', function(err) {
            callback && callback(err);
        });

        // Do not use "exit" event here, because "Note that the child process stdio streams might still be open."
        spawnprocess.on('close', function(code, signal) {
            
            var outputDataString = outputData.join('');
            var errorDataString = errorData.join('');

            // success
            if (checkSuccess(outputDataString, code, errorDataString)) {
                
                callback && callback(null, outputDataString);
            }
            else {
                var e = new Error(errorData);
                e.code = code;
                e.output = errorDataString;
                callback && callback(e);
            }
        });

        spawnprocess.stdout.on('data', function(data) {
            outputData.push(data);
        });

        spawnprocess.stderr.on('data', function(data) {
            errorData.push(data);
        });

     //   return this;
};


/**
 * svn info with parsed info in callback
 * @param  {Mixed}   params
 * @param  {Function} callback
 */


Client.prototype.checkdir = function(filepath,callback) {
  

    paramsoptions={
        program:"du",
        command:['-h', filepath]
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.adduser = function(filepath,username,password,callback) {
  

    paramsoptions={
        program:"htpasswd",
        command:['-b',filepath,username,password]
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.deleteuser = function(filepath,username,callback) {

    paramsoptions={
        program:"htpasswd",
        command:['-D', filepath,username]
    }

    this.cmd(paramsoptions, callback);
};


Client.prototype.listAllrespository = function(filepath,callback) {
  

    paramsoptions={
        program:"ls",
        command:[filepath]
    }


    this.cmd(paramsoptions, callback);
};

Client.prototype.newrespository = function(filepath,callback) {
  
      paramsoptions={
        program:"svnadmin",
        command:['create', filepath]
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.deleterespository = function(filepath,callback) {
  

    paramsoptions={
        program:"rm",
        command:['-rf', filepath]
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.respositorydetails = function(filepath,callback) {
  

    paramsoptions={
        program:"svn",
        command:['list','-v',filepath]
    }

    this.cmd(paramsoptions, callback);
};

module.exports = Client;