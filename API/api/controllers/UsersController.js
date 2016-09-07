/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe:function(req,res){
		var club_id=req.param('clubId');
		sails.sockets.join(req,club_id);
		res.ok();
	}
};

