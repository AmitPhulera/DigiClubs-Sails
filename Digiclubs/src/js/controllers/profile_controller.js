angular.module('DigiClubs.controllers.Profile', [])

.controller('profileController', function($http, $location, Authenticate, Server) {
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
    Master Object 'sc' use this to acess elements in each controller
    *****************************************************************/
    var sc = this;
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

    sc.profile = [];
    sc.getProfile = function() {
        var data = { userId: user.id };
        console.log('here');
        $http.get(theapp + 'users/'+ user.id)
            .then(function(response) {
                console.log(response);
                sc.profile = response.data;

            }, function(err) { 
                Materialize.toast('Some Error Occured While Connecting!!', 3000);
                console.log(err); 
            });
    };

});
