angular.module('DigiClubs.controllers.ProfileView', [])

.controller('profileViewController', function($http, $location,$routeParams, Authenticate, Server, Upload) {
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

    var userId = $routeParams.user_id;

    sc.getProfile=function(){
        $http.get(theapp + 'users/' + userId)
            .then(function(response) {
                sc.profile = response.data;
                //sc.profile.photo = theapp+'images/'+user.id+'.jpg';
                console.log();
            }, function(err) {
                Materialize.toast('Some Error Occured While Connecting!!', 3000);
                console.log(err);
            });
    };

});