/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe:function(req,res){
		sails.sockets.join(req,'public');
		res.ok();
	},
	savePost:function(req,res){
		var data=req.param('data');
		Posts.create(data).populate('user').exec(function(err,newPost){
			if(err){
				return res.negotiate(err);
			}
				
				console.log('here');
				sails.sockets.join(req,data.postedIn);
				if(newPost.privacy=='public'){
					sails.sockets.join(req,'public');
					console.log('adding to public');
				}
				console.log(newPost);
				Posts.findOne({id:newPost.id}).populate('user',{select:['name','id','photo']}).populate('postedIn',{select:['name','id']}).populate('comments').exec(function(err,result){
					if(err)
						return res.negotiate();
					console.log(result);
					sails.sockets.broadcast(data.postedIn,data.postedIn,result);
					if(newPost.privacy=="public"){
						sails.sockets.broadcast('public','publicPost',result);
						console.log('broadcasted to public');
					}
					res.ok();
				});
		});
	},
	listClubPosts:function(req,res){
		var club=req.param('clubId');
		Posts.find({postedIn:club}).populate('user',{select:['name','id','photo']}).populate('postedIn',{select:['name','id']}).populate('comments').exec(function(err,data){
			if(err)
				return res.negotiate();
			
			res.ok(data);
		});
	},
	listPublicPosts:function(req,res){
		Posts.find({privacy:'public'}).populate('user',{select:['name','id','photo']}).populate('postedIn',{select:['name','id']}).populate('comments').exec(function(err,data){
			if(err)
				return res.negotiate();
			
			res.ok(data);
		});
	},

};

