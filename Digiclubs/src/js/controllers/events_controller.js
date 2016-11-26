angular.module('DigiClubs.controllers.Events', [])

.controller('eventController', function($http, $location, Authenticate, Server, Upload) {
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

    sc.uploadavatar = function(file,e_id)
    {   
       // console.log(e_id +"in controller");
        var obj={
            url: theapp+'events/upload',
            data: { eventid: e_id, file: file }
            
        };
        console.log(obj);
        file.upload = Upload.upload(obj);

        file.upload.then(function(response) {
            Materialize.toast('Successfully uploaded',1000);
            console.log(response);
        }, function(response) {
            if (response.status > 0){
                sc.errorMsg = response.status + ': ' + response.data;
                console.log(sc.errorMsg);
            }
            
        }
        );
    };
});
