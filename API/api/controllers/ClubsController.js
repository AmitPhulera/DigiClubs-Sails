/**
 * ClubsController
 *
 * @description :: Server-side logic for managing clubs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list:function(req,res){
		Roles.find({role:'member'}).exec(function(err,list){
			if(!err)
				res.ok(list);
			else
				res.badRequest();
		});
	},
  listDetails:function(req,res){
    console.log('here');
    var club=req.param('clubId');
    console.log(req.allParams());
    Roles.find({'club':club}).populate('user_id',{select:['name','id']}).populate('club').exec(function(err,data){
      if(err)
        return res.negotiate();
    	console.log('reaching here');
    	console.log(data);
      	res.ok(data);
    });
  }
};

