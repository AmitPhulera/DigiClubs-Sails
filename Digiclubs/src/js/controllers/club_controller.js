angular.module('DigiClubs.controllers.Clubs', [])

.controller('clubController', function($http, $location, Authenticate,Server) {
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

    /***********************************************************************
    User Object 'user'. Use this to acess user info in every controller
    ***********************************************************************/
    var user = Authenticate.getObject('user');
    /*****************************************************************/

    /*  Functions Calling Differnt API's */
    sc.getClubs = function() {
        $http.get(theapp + "roles/list")
            .then(function(response) {
                sc.clubs = response.data;
            }, function(err) { console.log(err); });
    };
});
