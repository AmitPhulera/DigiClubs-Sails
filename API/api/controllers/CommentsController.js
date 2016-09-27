/**
 * CommentsController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveComment:function(req,res){
		var rData=req.param('data');
		var club=req.allParams();
		console.log(club.data.clubId);
		Comments.create(rData.data).exec(function(err,result){
			if(err)
				return res.negotiate();
			Comments.findOne({id:result.id}).populate('user',{select:['name','id']}).exec(function(err,data){
				if(err)
					return res.negotiate();
				if(club.data.clubId)
					sails.sockets.broadcast(club.data.clubId,'comment',data);
				else{
					console.log('public data');
					sails.sockets.broadcast('public','comment',data);
				}
				return res.ok();	
			});
		});
	}
};

