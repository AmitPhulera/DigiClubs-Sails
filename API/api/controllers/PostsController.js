/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savePost:function(req,res){
		console.log(req.param('data'));
		
		Posts.create(req.param('data')).exec(function(err,newPost){
			if(err){
				return res.negotiate(err);
			}
			
				console.log('here')
				Posts.publishCreate(newPost,req);
				return res.json(newPost);
			
		});
	}
};

