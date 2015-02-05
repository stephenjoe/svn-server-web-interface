
var Client = require('../lib/svncommand.js');
var fs = require('fs');
var async = require('async');

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

exports.listAllrespository = function(req, res) {

	var svnpath="/svn";

	client.listAllrespository(svnpath,function(err, data) {

		if(err==null){
		    return res.json(200, data);
		}else{
		    return res.json(200, err.output);
		}

	});
}

exports.deleterespository = function(req, res) {

	var svnpath="http://localhost/svn/repos2 --message 'Deleting'";

	client.deleterespository(svnpath,function(err, data) {

		if(err==null){
		    return res.json(200, data);
		}else{
		    return res.json(200, err.output);
		}

	});
}


exports.listAll = function(req, res) {
	
	if (!req.user) {
		return res.send(401);
	}

	var query = db.postModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].content = results[postKey].content.substr(0, 400);
    	}

  		return res.json(200, results);
	});
};

exports.read = function(req, res) {
	var id = req.params.id || '';
	if (id == '') {
		return res.send(400);
	}

	var query = db.postModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		if (result != null) {
  			result.update({ $inc: { read: 1 } }, function(err, nbRows, raw) {
				return res.json(200, result);
			});
  		} else {
  			return res.send(400);
  		}
	});
};

exports.like = function(req, res) {
	var id = req.body.id || '';
	if (id == '') {
		return res.send(400);
	}


	db.postModel.update({_id: id}, { $inc: { likes: 1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
}

exports.unlike = function(req, res) {
	var id = req.body.id || '';
	if (id == '') {
		return res.send(400);
	}


	db.postModel.update({_id: id}, { $inc: { likes: -1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});	
}

exports.create = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var post = req.body.post;
	if (post == null || post.title == null || post.content == null 
		|| post.tags == null) {
		return res.send(400);
	}

	var postEntry = new db.postModel();
	postEntry.title = post.title;
	postEntry.tags = post.tags.split(',');
	postEntry.is_published = post.is_published;
	postEntry.content = post.content;

	postEntry.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
}

exports.update = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var post = req.body.post;

	if (post == null || post._id == null) {
		res.send(400);
	}

	var updatePost = {};

	if (post.title != null && post.title != "") {
		updatePost.title = post.title;
	} 

	if (post.tags != null) {
		if (Object.prototype.toString.call(post.tags) === '[object Array]') {
			updatePost.tags = post.tags;
		}
		else {
			updatePost.tags = post.tags.split(',');
		}
	}

	if (post.is_published != null) {
		updatePost.is_published = post.is_published;
	}

	if (post.content != null && post.content != "") {
		updatePost.content = post.content;
	}

	updatePost.updated = new Date();

	db.postModel.update({_id: post._id}, updatePost, function(err, nbRows, raw) {
		return res.send(200);
	});
};

exports.delete = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var id = req.params.id;
	if (id == null || id == '') {
		res.send(400);
	} 

	var query = db.postModel.findOne({_id:id});

	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		if (result != null) {
			result.remove();
			return res.send(200);
		}
		else {
			return res.send(400);
		}
		
	});
};

exports.listByTag = function(req, res) {
	var tagName = req.params.tagName || '';
	if (tagName == '') {
		return res.send(400);
	}

	var query = db.postModel.find({tags: tagName, is_published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].content = results[postKey].content.substr(0, 400);
    	}

  		return res.json(200, results);
	});
}
