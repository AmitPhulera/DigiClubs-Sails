angular.module('DigiClubs.controllers.Feedback', [])

.controller('feedbackController', function($http, $location, Authenticate, Server) {
    /****************************************************************
               Authentication Wali BAketi !!!
       *****************************************************************/
    if (!Authenticate.get('token')) {
        $location.path('/');
        Materialize.toast('Login To Continue!', 3000);
        return;
    }
    /*****************************************************************/
    Materialize.toast('We Value your Opinion, these feedbacks are completely anonymous feel free to shout.' , 3000);

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


    sc.store_feedback = function() {
        //console.log(sc.feedback);
        sc.feedback.id = user.id;
        $http.post(theapp + 'feedback', { data: sc.feedback }).then(function(res) {
        	Materialize.toast('Feedback Recieved, Thank you for your precious time.' , 3000);
        }, function(err) {
            console.log(err);
        });
    };
    
});