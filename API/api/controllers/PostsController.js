/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savePost:function(req,res){
		console.log(req.allParams());
		var data=req.param('data');
		
		// sails.sockets.join(req.socket,club);
		// sails.sockets.broadcast(club,'newPost');
				
		Posts.create(data).populate('user').exec(function(err,newPost){
			if(err){
				return res.negotiate(err);
			}
				
				console.log('here')
				sails.sockets.join(req,data.postedIn);
				console.log('User subscribed to '+data.postedIn);
				console.log(newPost);
				Posts.findOne({id:newPost.id}).populate('user',{select:['name','id']}).populate('postedIn',{select:['name','id']}).populate('comments').exec(function(err,result){
					if(err)
						return res.negotiate();
					console.log(result);
					sails.sockets.broadcast(data.postedIn,data.postedIn,result);
					res.ok();
				});
				
				
			
		});
	},
	listClubPosts:function(req,res){
		var club=req.param('clubId');
		Posts.find({postedIn:club}).populate('user',{select:['name','id']}).populate('postedIn',{select:['name','id']}).populate('comments').exec(function(err,data){
			if(err)
				return res.negotiate();
			console.log(data);
			res.ok(data);
		});
	}
};

