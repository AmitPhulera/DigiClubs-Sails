/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribe: function(req, res) {
        var club_id = req.param('clubId');
        sails.sockets.join(req, club_id);
        res.ok();
    },
    list: function(req, res) {
        var uid = req.param('userId');
        Roles.find({ 'user_id': uid }).populate('user_id', { select: ['name', 'id', 'photo'] }).populate('club', { select: ['name', 'id'] }).exec(function(err, data) {
            if (err)
                return res.negotiate();
            console.log(data);

            res.ok(data);
        });
    },

    search: function(req, res) {
        usr = req.param('name');
        Users.find({
            select: ['name', 'id', 'photo'],
            name: { startsWith: usr }
        }).exec(function(err, userList) {
            if (err)
                return res.negotiate();
            res.ok(userList);
        });

    },

    userSearch: function(req, res) {
        var club_id = req.param('club_id');
        var key = req.param('name');

        var query = {
            or: [
                { name: { startsWith: key } },
                { email: { startsWith: key } }
            ],
            limit: 7
        };
        Users.find(query).populate('roles', { select: ['club'] }).exec(function(err, data) {
            if (err)
                return res.badRequest();
            
            var c = [];
            var isMember=false;
            for (var i = data.length - 1; i >= 0; i--) {
                roles = data[i].roles;
                for (var j = roles.length - 1; j >= 0; j--) {
                    
                    if (roles[j].club == club_id) {
                        
                        isMember=true;
                        break;
                    }
                }
                if(!isMember){
                    var obj = {};
                    obj.name = data[i].name;
                    obj.email = data[i].email;
                    obj.id = data[i].id;
                    obj.photo=data[i].photo;
                    c.push(obj);
                    isMember=false;
                }
                
            }
            res.ok(c);
        });
    },

    upload: function(req, res) {
        req.file('file').upload({ dirname: sails.config.appPath + '/attachments/images/profile/', saveAs: req.param('userid') + '.jpg' }, function(err, files) {
            if (err)
                return res.serverError(err);
            var theurl = req.baseUrl + '/images/profile/' + req.param('userid') + '.jpg';
            Users.update({ 'id': req.param('userid') }, { 'photo': theurl, 'about': req.param('about') }).exec(function(err, data) {
                if (err)
                    console.log(err);
                else
                    return res.ok({
                        message: files.length + ' file(s) uploaded successfully!',
                        files: files,
                        user: data
                    });
            });
        });
    }



};
