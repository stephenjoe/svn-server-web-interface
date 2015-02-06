'use strict';

var Spawn = require('easy-spawn');
var util = require('util');
var xml2js = require('xml2js');
var async = require('async');
var fs = require('fs');
var paramsoptions={

};

var Client = function(options) {
   
    this.option({
        program: 'ls'
    }).option(options);
};

util.inherits(Client, Spawn);

Client.prototype.cmd = function(paramsoptions, callback) {
   
    return Client.super_.prototype.cmd.call(this, paramsoptions, callback);
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