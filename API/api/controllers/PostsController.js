/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribe: function(req, res) {
        sails.sockets.join(req, 'public');
        res.ok();
    },
    savePost: function(req, res) {
        var data = req.param('data');

        Posts.create(data).populate('user').exec(function(err, newPost) {
            if (err) {
                console.log(err)
                return res.negotiate(err);
            }

            sails.sockets.join(req, data.postedIn);
            if (newPost.privacy == 'public') {
                sails.sockets.join(req, 'public');
                console.log('adding to public');
            } else {
                sails.sockets.join(req, data.postedIn)
            }
            console.log(newPost);
            Posts.findOne({ id: newPost.id }).populate('user', { select: ['name', 'id', 'photo'] }).populate('postedIn', { select: ['name', 'id'] }).populate('comments').exec(function(err, result) {
                if (err)
                    return res.negotiate();

                //sails.sockets.broadcast(data.postedIn,data.postedIn,result);
                if (newPost.privacy == "public") {
                    sails.sockets.broadcast('public', 'publicPost', result);
                    sails.sockets.broadcast(data.postedIn, data.postedIn, result);
                    console.log('broadcasted to public');
                } else {
                    sails.sockets.broadcast(data.postedIn, data.postedIn, result);
                    console.log('broadcasted to private');
                }
                res.ok();
            });
        });
    },
    listClubPosts: function(req, res) {
        var club = req.param('clubId');
        Posts.find({ postedIn: club }).populate('user', { select: ['name', 'id', 'photo'] }).populate('postedIn', { select: ['name', 'id'] }).populate('comments').exec(function(err, data) {
            if (err)
                return res.negotiate();

            res.ok(data);
        });
    },
    listPublicPosts: function(req, res) {
        Posts.find({ privacy: 'public' }).populate('user', { select: ['name', 'id', 'photo'] }).populate('postedIn', { select: ['name', 'id'] }).populate('comments').exec(function(err, data) {
            if (err)
                return res.negotiate();

            res.ok(data);
        });
    },
    deletePost: function(req, res) {
        var cids = req.param('casspost');
        var pid = req.param('pid');
        //cids : ids of comments to be removed
        cids.forEach(function(entry) {
            Comments.destroy({ id: entry }).exec(function(err, result) {
                if (err)
                    return res.negotiate();
            });
        });
        Posts.destroy({ id: pid }).exec(function(err, result) {
            if (err)
                return res.negotiate();
            return res.ok();
        });
    }

};
