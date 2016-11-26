/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribe: function(req, res) {
        var club_id = req.param('clubId');
        console.log('*****************');
        console.log('clubId is ' + club_id);
        sails.sockets.join(req, club_id);
        res.ok();
    },
    list: function(req, res) {
        var uid = req.param('userId');
        console.log(req.allParams());
        Roles.find({ 'user_id': uid }).populate('user_id', { select: ['name', 'id'] }).populate('club', { select: ['name', 'id'] }).exec(function(err, data) {
            if (err)
                return res.negotiate();
            console.log(data);

            res.ok(data);
        });
    },

    search: function(req, res) {
        usr=req.param('name');
        console.log('usr');
        Users.find({
            select:['name','id','photo'],
            name: { startsWith: usr }
        }).exec(function(err, userList) {
            if(err)
                return res.negotiate();
            res.ok(userList);
        });

    },


    upload: function(req, res) {
        req.file('file').upload({ dirname: sails.config.appPath+'/attachments/images/profile/' , saveAs: req.param('userid') + '.jpg' }, function(err, files) {
            if (err)
                return res.serverError(err);
            var theurl = req.baseUrl + '/images/profile/' + req.param('userid') + '.jpg';
            Users.update({'id':req.param('userid')},{ 'photo': theurl , 'about' : req.param('about')}).exec(function(err, data) {
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
