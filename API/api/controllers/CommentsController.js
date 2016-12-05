
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
		
		console.log(club);
		console.log('*************************');
		console.log(club.data.club);
		Comments.create(rData.data).exec(function(err,result){
			if(err)
				return res.negotiate();
			Comments.findOne({id:result.id}).populate('user',{select:['name','id']}).exec(function(err,data){
				if(err)
					return res.negotiate();
				if(club.data.privacy=="public"){
					console.log('sending comment to club '+club.data.club);
					sails.sockets.broadcast(club.data.club,'comment',data);
					console.log('public ');
					sails.sockets.broadcast('public','commentt',data);
				}
				else{
					console.log('private post');
					sails.sockets.broadcast(club.data.club,'comment',data);
				}
				return res.ok();	
			});
		});
	}
};


