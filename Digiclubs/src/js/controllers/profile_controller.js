angular.module('DigiClubs.controllers.Profile', [])

.controller('profileController', function($http, $location, Authenticate, Server, Upload) {
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
    sc.updateUrl='#/editUser/'+user.id;
    sc.updateuser={};
    sc.profile = [];
    sc.isBtnDisabled=false;
    sc.openModal=function(){
        $('#editProfile').modal('open');
    };
    sc.getProfile = function() {
        var data = { userId: user.id };
        console.log('here');
        $http.get(theapp + 'users/' + user.id)
            .then(function(response) {
                sc.profile = response.data;
                //sc.profile.photo = theapp+'images/'+user.id+'.jpg';
                console.log();
            }, function(err) {
                Materialize.toast('Some Error Occured While Connecting!!', 3000);
                console.log(err);
            });

        $http.get(theapp + 'users/list?userId=' + user.id)
            .then(function(response) {
                sc.clubdata = response.data;
            }, function(err) {
                Materialize.toast('Some Error Occured While Connecting!!', 3000);
            });

    };



    sc.uploadavatar = function(file) {
        
        sc.updateuser.id=user.id;
        var obj={
            url: theapp+'users/upload',
            data: { userid: user.id, about:sc.updateuser.about, file: file }
            
        };
        sc.isBtnDisabled=true;
        console.log(obj);
        file.upload = Upload.upload(obj);

        file.upload.then(function(response) {
            Materialize.toast('Successfully uploaded',1000);
            sc.isBtnDisabled=false;
            console.log(response);
        }, function(response) {
            if (response.status > 0){
                sc.isBtnDisabled=false;
                Materialize.toast('Error Uploading File',1000);
                sc.errorMsg = response.status + ': ' + response.data;
                console.log(sc.errorMsg);
            }
            
        }//, function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
         //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        //}
        );
    };

});
