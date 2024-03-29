angular.module('DigiClubs.controllers.Posts', [])

.controller('PostsController', function(Authenticate, Server, $location, $http, $scope) {

    /****************************************************************
                Authentication Wali BAketi !!!
    *****************************************************************/
    if (!Authenticate.get('token')) {
        $location.path('/');
        Materialize.toast('Login To Continue!', 3000);
        return;
    }
    /*****************************************************************/


    /****************************************************************
    Master Object 'sc' use this to access elements in every controller
    *****************************************************************/
    var sc = this;
    /*****************************************************************/


    /******************************************************************************
    Use 'theapp' for api calls to server,returns address to server
    *******************************************************************************/
    var theapp = Server;
    /*****************************************************************************/

    /******************************************************************
    User Object 'user'. Use this to acess user info in every controller
    *****************************************************************/
    var user = Authenticate.getObject('user');
    /*****************************************************************/

    sc.btnDisabled = false;
    sc.post_list = [];

    io.socket.on('commentt', function(msg) {
        console.log(msg);
        angular.forEach(sc.post_list, function(value, key) {

            if (value.id == msg.post) {
                var tmp = msg.user.id;
                msg.user = tmp;
                value.comments.push(msg);
                $scope.$apply();
            }
        });
    });

    io.socket.on('publicPost', function(msg) {

        console.log(msg);
        sc.post_list.push(msg);
        $scope.$apply();

    });

    /*****************Ended In Peace****************/

    sc.fetch_posts = function() {
        var headers = { Authorization: 'JWT ' + Authenticate.get('token') };
        io.socket.get(theapp + 'posts/subscribe', function(err, data) {
            if (err) {
                Materialize.toast('Error While Connecting!!', 3000);
                $location.path('/');
            } else {
                console.log('User subscribed for the club');
            }
        });
        $http.get(theapp + 'posts/listPublicPosts').then(function(response) {
            console.log(response.data);
            sc.post_list = response.data;
            sc.post_list.userid = user.id;

        }, function(error) {
            console.log('error');
            console.log(error);
        });
    };

    sc.doComment = function(postId, comment, index, privacy, clubId) {
        if (!comment || this.comment.length <= 0)
            return;
        comm = {
            data: {
                comment: comment,
                post: postId,
                user: user.id,
                name: user.name
            },
            privacy: privacy,
            club: clubId
        };
        sc.btnDisabled = true;
        console.log(comm);
        $http.post(theapp + 'comments/saveComment', { data: comm }).then(function(res) {

            sc.comment[index] = '';
            //$scope.comment[index] = '';
            sc.btnDisabled = false;
        }, function(err) {
            sc.btnDisabled = false;
            console.log(err);
        });
        console.log(postId);
    };

    sc.deleteCom = function(com_delete, posthavingcom) {
        var cid = com_delete.id;
        var pid = posthavingcom.id;
        //Never use $index as a parameter to delete stuff..index change for new data in scope.
        $http.post(theapp + 'comments/deleteComment', { cid: cid }).then(function(response) {
            sc.post_list[sc.post_list.indexOf(posthavingcom)].comments.splice(sc.post_list[sc.post_list.indexOf(posthavingcom)].comments.indexOf(com_delete), 1);
            Materialize.toast('Comment Deleted Successfully', 3000);
        });

    };

    sc.deletePost = function(post_delete) {
        var pid = post_delete.id;
        console.log('Delete post having id :' + pid);
        //casspost : comment associated with the post
        var casspost = [];
        post_delete.comments.forEach(function(entry) {
            casspost.push(entry.id);
        });
        $http.post(theapp + 'posts/deletePost', { casspost: casspost, pid: pid }).then(function(response) {
            sc.post_list.splice(sc.post_list.indexOf(post_delete), 1);
            Materialize.toast('Post Deleted Successfully', 3000);
        });


    };


});
