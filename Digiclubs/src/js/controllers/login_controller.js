angular.module('DigiClubs.controllers.Login', [])

.controller('loginController', function($scope, $http,$window, $sce, $location, Authenticate, Server) {
    /****************************************************************
                Authentication Wali BAketi !!!
    *****************************************************************/
    if (Authenticate.get('token')) {
        user = Authenticate.getObject('user');
        console.log(user);
        Materialize.toast('Hello ' + user.name, 3000);
        $location.path('/posts');
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



    var user = {};

    // LOGIN Function
    $scope.try_login = function() {
        console.log($scope.login);
        $http.post(theapp + 'auth/signin', $scope.login)
            .then(function a(response) {
                    console.log('success');
                    console.log(response);
                    var auth = {
                        user: response.data.user,
                        token: response.data.token
                    };
                    Materialize.toast('Logging In', 2000);
                    Authenticate.set('token', response.data.token);
                    Authenticate.setObject('user', response.data.user);
                    $location.path('/posts');

                },
                function b(response) {
                    Materialize.toast(response.statusText, 4000);
                    console.log(response);
                });
    };
    $scope.try_login_fb = function() {
        var t = $sce.trustAsResourceUrl(theapp + 'auth/signinfb');
        
        $http.jsonp(theapp + 'auth/signinfb',{jsonpCallbackParam: 'callback'})
            .success(function a(response) {
                console.log('success');
                //console.log(response);
                // var auth = {
                //     user: response.data.user,
                //     token: response.data.token
                // };
                // Materialize.toast('Logging In', 2000);
                // Authenticate.set('token', response.data.token);
                // Authenticate.setObject('user', response.data.user);
                // $location.path('/posts');

            }).
        error(function b(response) {
            //Materialize.toast(response.statusText, 4000);
            console.log(response);
        });

    };
});
