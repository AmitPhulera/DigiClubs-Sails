angular.module('DigiClubs.controllers.Posts', [])

.controller('PostsController', function(Authenticate,Server, $location, $http) {
    
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
    Master Object 'sc' use this to acess elements in every controller
    *****************************************************************/
    var sc = this;
    /*****************************************************************/

    
    /******************************************************************************
    Object 'user'. Use 'theapp' for api calls to server,returns address to server
    *******************************************************************************/    
    var theapp = Server;
   /*****************************************************************************/

    /******************************************************************
    User Object 'user'. Use this to acess user info in every controller
    *****************************************************************/
    var user = Authenticate.getObject('user');
    /*****************************************************************/


    sc.post_list = [];

    /**********Socket Shit****************/

    io.sails.url = "http://localhost:1337";

    io.socket.on('connect', function() {
        io.socket.on('posts', function(msg) {
            console.log(msg);
            if (msg.verb == 'created') {
                console.log(msg.data);
                sc.post_list.push(msg.data);
                //console.log($scope.main.post_list);
                //$scope.$apply();
            }

        });
    });

    io.socket.on('comment', function(msg) {
        console.log(msg);
        angular.forEach(sc.post_list, function(value, key) {

            if (value.id == msg.post) {

                value.comments.push(msg);
            }
        });

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

        }, function(error) {
            console.log('error');
            console.log(error);
        });
    };

    sc.doComment = function(postId, comment, index) {
        comm = {
            data: {
                comment: comment,
                post: postId,
                user: user.id,
                name: user.name
            },

        };
        console.log(comm);
        $http.post(theapp + 'comments/saveComment', { data: comm }).then(function(res) {

            sc.comment[index] = '';
            //$scope.comment[index] = '';
        }, function(err) {
            console.log(err);
        });
        console.log(postId);
    };

});
