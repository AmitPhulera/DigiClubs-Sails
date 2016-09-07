/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savePost:function(req,res){
		console.log(req.param('data'));
		var club=req.param('club');
		console.log(club);
		// sails.sockets.join(req.socket,club);
		// sails.sockets.broadcast(club,'newPost');
				
		Posts.create(req.param('data')).exec(function(err,newPost){
			if(err){
				return res.negotiate(err);
			}
			
				console.log('here')
				sails.sockets.join(req,club);
				console.log('User subscribed to '+club);
				console.log(newPost);
				sails.sockets.broadcast(club,club,newPost);
				return res.ok(newPost);
			
		});
	}
};

