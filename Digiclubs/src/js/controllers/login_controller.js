angular.module('DigiClubs.controllers.Login', [])

.controller('loginController', function($scope, $http,$auth,$window, $sce, $location, Authenticate, Server) {
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

    sc.overlayShow = false;

    $scope.authenticate = function(provider) {
      sc.overlayShow = true;
      $auth.authenticate(provider)
            .then(function(){
                sc.overlayShow = false;
                var usr=$auth.getPayload();
                console.log('done');
                console.log(usr);
                Authenticate.setObject('user', usr);
                $location.path('/posts');
            })
            .catch(function(){
                sc.overlayShow = false;
                console.log(usr);
            });
    };

    // LOGIN Function
    $scope.try_login = function() {
        sc.overlayShow = true;
        console.log($scope.login);
        $http.post(theapp + 'auth/signin', $scope.login)
            .then(function a(response) {
                    sc.overlayShow = false;
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
                    sc.overlayShow = false;
                    Materialize.toast(response.statusText, 4000);
                    console.log(response);
                });
    };
    
    
    $scope.try_login_fb = function() {
        console.log('here');
        /*var options ="location=no,hardwareback=no,zoom=no";
            var ref = cordova.InAppBrowser.open(Server+'auth/signinfb','_blank', options);*/
        window.open('http://localhost:1337/auth/signinfb',
    "loginWindow");
        
        /*$http.jsonp(theapp + 'auth/signinfb',{jsonpCallbackParam: 'callback'})
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
*/
    };
});
