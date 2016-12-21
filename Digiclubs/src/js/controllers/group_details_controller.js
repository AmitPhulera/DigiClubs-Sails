angular.module('DigiClubs.controllers.GroupDetails', [])
    .controller('groupDetailsController', function($scope, $http, $location,$window, $routeParams, Authenticate, Server) {

        /****************************************************************
                Authentication Wali BAketi !!!
        *****************************************************************/
        if (!Authenticate.get('token')) {
            $location.path('/');
            Materialize.toast('Login To Continue!', 3000);
            return;
        }
        /*****************************************************************/
        var clubId = $routeParams.club_id;
        /****************************************************************
        Master Object 'sc' use this to acess elements in every controller
        *****************************************************************/
        var sc = this;
        /*****************************************************************/

        /****************************************************************
                    Sokcet Connection Shit
        *****************************************************************/

        sc.connect = function() { //Subscribing user to the club's socket list 
            //$('select').material_select();
            sc.addEventUrl = '#/addEvent/' + clubId;
            var id = {
                'clubId': clubId
            };
            console.log(id);
            io.socket.get(theapp + 'users/subscribe', id, function(err, data) {
                if (err) {
                    Materialize.toast('Error While Connecting!!', 3000);
                    $location.path('/');
                } else {
                    console.log('User subscribed for the club');
                }
                $http.get(theapp + 'clubs/listDetails/?clubId=' + clubId + '&userId=' + user.id).then(function(response) {

                    console.log(response.data);
                    //sc.clubPosts=response.data;
                });
            });
            $http.get(theapp + 'posts/listClubPosts/?clubId=' + clubId).then(function(response) {

                console.log(response.data);
                sc.clubPosts = response.data;
            });


        };
        //looking for new posts and appending to the post array
        io.socket.on(clubId, function(msg) {
            console.log(msg);
            sc.clubPosts.push(msg);
            $scope.$apply();

        });
        //looking for new comments and appending to respective posts
        io.socket.on('comment', function(msg) {


            angular.forEach(sc.clubPosts, function(value, key) {
                if (value.id == msg.post) {
                    console.log(msg);
                    console.log('here');
                    var tmp = msg.user.id;
                    msg.user = tmp;
                    console.log(msg);
                    value.comments.push(msg);
                    $scope.$apply();

                }
            });

        });

        io.socket.on('posts', function(msg) {
            console.log(msg);
            if (msg.verb == 'created') {
                console.log(msg.data);
                sc.post_list.push(msg.data);
                //console.log($scope.main.post_list);
                $scope.$apply();
            }
        });

        io.socket.on('private', function(msg) {
            console.log(msg);
            if (msg.verb == 'created') {
                console.log(msg.data);
                sc.post_list.push(msg.data);
                //console.log($scope.main.post_list);
                $scope.$apply();
            }
        });
        /*****************************************************************/

        /******************************************************************************
        Object 'user'. Use 'theapp' for api calls to server,returns address to server
        *******************************************************************************/
        var theapp = Server;
        /*****************************************************************************/

        /***********************************************************************
        User Object 'user'. Use this to acess user info in every controller
        ***********************************************************************/
        var user = Authenticate.getObject('user');
        /*****************************************************************/

        sc.addEventUrl = '#/addEvent/' + clubId;
        sc.addMembers='#/addMember/' + clubId;
        sc.manageClub="#/manageClub/"+ clubId;
        sc.comment = [];
        sc.btnDisabled = false;
        var stream = ['CS', 'ECE', 'Mechanical', 'All'];
        sc.clubLead = "";
        sc.newMember = [];
        sc.clubPosts = [];
        sc.priv = 'private';
        sc.nameListShow = 0;
        sc.count = 0;
        sc.memberCount = 0;
        sc.hideCountDiv = 0;
        var memberObj = [];
        $scope.count = 0;
        $scope.disabled=[0];
        $scope.hideBtn=[1];
        sc.doComment = function(comment, index, postId, privacy) {
            comm = {
                data: {
                    comment: comment,
                    post: postId,
                    user: user.id,
                    name: user.name
                },
                club: clubId,
                privacy: privacy
            };
            sc.btnDisabled = true;
            if (comm.data.comment.length <= 0)
                return;
            $http.post(theapp + 'comments/saveComment', { data: comm }).then(function(res) {
                console.log(res);
                sc.comment[index] = '';
                sc.btnDisabled = false;
            }, function(err) {
                sc.btnDisabled = false;
                console.log(err);
            });
            console.log(postId);
        };

        sc.insertPost = function() {
            if (sc.post_content.length <= 0)
                return;
            var data = {
                'data': {
                    'post': sc.post_content,
                    'postedIn': clubId,
                    'user': user.id,
                    'privacy': sc.priv //ToDO privacy to be changed
                }
            };
            console.log(data);
            io.socket.post(theapp + 'posts/savePost', data, function(err, response) {
                if (err) {
                    console.log('err');
                    console.log(err);
                } else {
                    sc.post_content = '';
                    $('#post_insert').val('');
                    console.log("ye dekho " + sc.post_content);
                }
            });
        };
        sc.addEvent = function() {
            branch = [];
            for (i = 0; i <= stream.length; i++) {
                if (sc.branch[i])
                    branch.push(stream[i]);
            }
            sc.event.branch = branch;
            sc.clubs = clubId;
            console.log(sc.event);
            $http.post(theapp + 'events/create', sc.event)
                .then(function(res) {
                    Materialize.toast(sc.event.name + 'added as new event.', 3000);
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        };
        sc.addClub = function() {
            branch = [];
            for (i = 0; i <= stream.length; i++) {
                if (sc.Cbranch[i])
                    branch.push(stream[i]);
            }
            sc.club.branches = branch;
            sc.club.lead = sc.clubLead_id;
            $http.post(theapp + 'clubs/add', sc.club)
                .then(function(res) {
                    Materialize.toast(sc.club.name + 'added as new club', 3000);
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        };
        sc.assign = function(id, name) {
            sc.clubLead_id = id;
            sc.clubLead = name.toString();
            console.log(id + ' ' + name);
            sc.nameListShow = 0;
        };
        sc.assignMember = function(id, name,count) {
                var obj = {
                    user_id: id,
                    club: clubId
                };
                console.log(memberObj);
                sc.newMember[count] = name.toString();
                memberObj.push(obj);
                sc.nameListShow = 0;

                $scope.disabled[count]=1;
                console.log(memberObj);
            }
            //List all the users to assign them postion of admin 
        sc.listNames = function() {
            var auto = [];
            console.log('check it out');
            $http.post(theapp + 'users/search', { name: sc.clubLead })
                .then(function(res) {
                    sc.nameList = res.data;
                    sc.nameListShow = 1;
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });

        };
        sc.removeFromMemberList=function(count){
            console.log(memberObj);
            $('#entry'+count).fadeOut();
            
            memberObj[count]=null;
            console.log(memberObj);

        }
        //List out data of users that are not part of the specified club
        sc.listPeople = function(memName) {
            $http.post(theapp + 'users/userSearch', { name: memName, club_id: clubId })
                .then(function(res) {
                    sc.nameList = res.data;
                    sc.nameListShow = 1;
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });

        };

        sc.addMembersToClub=function(){
            
            var finalObj=[];
            for (var i = memberObj.length - 1; i >= 0; i--) {
                if(memberObj[i]!=null)
                    finalObj.push(memberObj[i]);
            }
            $http.post(theapp + 'roles/addMembers', { members: finalObj})
                .then(function(res) {
                    Materialize.toast('Added '+res.data.length+' members.',3000,'',function(){
                        $window.location.reload();
                    });
                   console.log(res);
                }, function(err) {
                    console.log(err);
                });
        }

    });
