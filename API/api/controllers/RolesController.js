/**
 * RolesController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 

module.exports = {
	list:function(req,res){
		var cname = null;
		var cdetail = null;
		var arr=[];
		
		Roles.find({role:'admin'}).populate('club').populate('user_id')
			.then(function(user){
				async.each(user,function(user,callback){
				Roles.count({role:'member',club:user.club.id}).exec(function(err,found){
						var q = user.club;//{role:'member',club:user.club.id};

						if(err)
							return res.badRequest();
						obj={clubname:user.club.name,clubdetails:user.club.detail,club_id:user.club.id,admin:user.user_id.name,admin_id:user.user_id.id,member:found};

						arr.push(obj);
						callback();
					});
				},function(){
					return res.ok(arr);
				});
			})
			.catch(function(err){
				res.negotiate();
			});
	}
};
