angular.module('DigiClubs.controllers.Events', [])

.controller('eventController', function($http, $location, Authenticate, Server) {
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

        

    sc.getEvents=function(){
        $http.get(theapp+'events').then(
            function(res){
                sc.allEvents=res.data;
                console.log(res.data);
            },
            function(err){
                console.log(err);
            });
    };

});
