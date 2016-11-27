angular.module('DigiClubs.controllers.Clubs', [])

.controller('clubController', function($http, $location, Authenticate,Server,Upload) {
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

    sc.uploadavatar = function(file,c_id)
    {   
        console.log(c_id +"in controller");
        var obj={
            url: theapp+'clubs/upload',
            data: { clubid: c_id, file: file }
            
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
