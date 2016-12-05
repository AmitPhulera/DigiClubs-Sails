/**
 * ClubsController
 *
 * @description :: Server-side logic for managing clubs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res) {
        Roles.find({ role: 'member' }).exec(function(err, list) {
            if (!err)
                res.ok(list);
            else
                res.badRequest();
        });
    },
    listDetails: function(req, res) {
        var club = req.param('clubId');
        console.log(req.allParams());
        Roles.find({ 'club': club }).populate('user_id', { select: ['name', 'id'] }).populate('club').exec(function(err, data) {
            if (err)
                return res.negotiate();
            console.log('reaching here');
            console.log(data);
            res.ok(data);
        });
    },
    add:function(req,res){
        console.log(req.allParams());
        var club={};
        club.name=req.param('name');
        club.detail=req.param('detail');
        club.faculty=req.param('faculty');
        club.branches=req.param('branches');
        leadId=req.param('lead');
        Clubs.create(club).exec(function(err,newClub){
            if(err){
                return res.negotiate();
            }
            var role={
                role:"admin",
                user_id:leadId,
                club:newClub.id
            };
            Roles.create(role).exec(function(err,role){
                res.ok(newClub);
            });

            
        });
        
    },
    upload: function(req,res)
    {   var clubid = req.param('clubid');
        console.log(clubid+" in API");
        req.file('file').upload({ dirname: sails.config.appPath+'/attachments/images/clubs/' , saveAs: clubid+'.jpg' }, function(err, files) {
            if (err)
                return res.serverError(err);
            var theurl = req.baseUrl + '/images/clubs/'+clubid+'.jpg';
            Clubs.update({'id':clubid},{'photo' : theurl}).exec(function(err, data) {
                if (err)
                    console.log(err);
                else
                    return res.ok({
                        message: files.length + ' file(s) uploaded successfully!',
                        files: files,
                        user:data
                    });
            });
        });
    }    

};
