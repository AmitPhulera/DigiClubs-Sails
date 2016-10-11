/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe:function(req,res){
		var club_id=req.param('clubId');
        console.log('*****************');
        console.log('clubId is '+club_id);
		sails.sockets.join(req,club_id);
		res.ok();
	},
    list: function(req, res) {
        var uid = req.param('userId');
        console.log(req.allParams());
        Roles.find({ 'user_id': uid }).populate('user_id', { select: ['name', 'id'] }).populate('club', {select:['name','id']}).exec(function(err, data) {
            if (err)
                return res.negotiate();
            console.log(data);

            res.ok(data);
        });
    }

};

