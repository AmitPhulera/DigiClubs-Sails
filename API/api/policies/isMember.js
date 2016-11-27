module.exports = function (req, res, next) {
    Roles.findOne({user_id:req.param('user_id')}).exec(function(err,data){
    	if(err)
    		return res.serverError(error);
    	if(data.role!='member')
    		return res.unauthorized(null, {code:400}, {message:'Not Permitted'});
    		next();
    });
};