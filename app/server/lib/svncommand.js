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

Client.prototype.getInfo = function(params, callback) {
    
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    var self = this;

    params = Spawn.joinParams(['info', '--xml'], params),
    
    async.waterfall([
        function(callback) {
            self.session('silent', true).cmd(params, callback);
        },
        function(data, callback) {
            xml2js.parseString(data, 
                {
                    explicitRoot: false, 
                    explicitArray: false
                },
                callback
            );
        },
    ], function(err, data) {
        if (callback) {
            if (err) {
                callback(err);
            }
            else {
                callback(err, data.entry);
            }
        }
    });
};

Client.prototype.checkdir = function(filepath,callback) {
  

    paramsoptions={
        program:"du",
        command:"-h",
        path:filepath
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.listAllrespository = function(filepath,callback) {
  

    paramsoptions={
        program:"ls",
        command:"",
        path:filepath
    }

    this.cmd(paramsoptions, callback);
};

Client.prototype.deleterespository = function(filepath,callback) {
  

    paramsoptions={
        program:"svn",
        command:"delete",
        path:filepath
    }

    this.cmd(paramsoptions, callback);
};


module.exports = Client;