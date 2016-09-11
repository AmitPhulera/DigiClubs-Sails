angular.module('DigiClubs', [
  'ngRoute',
  'mobile-angular-ui',
  'DigiClubs.controllers.Main',
  'DigiClubs.controllers.Login',
  'DigiClubs.controllers.Posts',
  'DigiClubs.controllers.GroupDetails',
  'DigiClubs.controllers.Clubs',
  'DigiClubs.controllers.Profile'
 ])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false})
  	.when('/posts', {templateUrl:'posts.html',  reloadOnSearch: false})
  	.when('/profile', {templateUrl:'profile.html',  reloadOnSearch: false})
  	.when('/clubs', {templateUrl:'clubs.html',  reloadOnSearch: false})
  	.when('/events', {templateUrl:'events.html',  reloadOnSearch: false})
  	.when('/contact', {templateUrl:'contact.html',  reloadOnSearch: false})
  	.when('/clubs/:club_id', {templateUrl:'group_details.html',  reloadOnSearch: false})
    .when('/signup',{templateUrl:'signup.html',reloadOnSearch:false});
});