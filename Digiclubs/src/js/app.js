angular.module('DigiClubs', [
  'ngRoute',
  'mobile-angular-ui',
  'ngFileUpload',
  'satellizer',
  'DigiClubs.controllers.Main',
  'DigiClubs.controllers.Login',
  'DigiClubs.controllers.Posts',
  'DigiClubs.controllers.GroupDetails',
  'DigiClubs.controllers.Clubs',
  'DigiClubs.controllers.Events',
  'DigiClubs.controllers.Profile',
  'DigiClubs.controllers.ProfileView',
  'DigiClubs.controllers.Feedback'
 ])

.config(function($routeProvider,$authProvider) {
  $authProvider.tokenPrefix = '';
  $authProvider.facebook({
      clientId: 1164205113600754,
      name: 'facebook',
      redirectUri:'http://localhost/',
      url: 'http://digiclubs.westus.cloudapp.azure.com/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 580, height: 400 }
  });
  $authProvider.google({
      clientId: '565734768883-dlunqnt9i927rajtrep3berc7msninff.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8000/',
      url: 'http://digiclubs.westus.cloudapp.azure.com/auth/google' ,
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 452, height: 633 }
    });
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false})
  	.when('/posts', {templateUrl:'posts.html',  reloadOnSearch: false})
  	.when('/profile', {templateUrl:'profile.html',  reloadOnSearch: false})
  	.when('/clubs', {templateUrl:'clubs.html',  reloadOnSearch: false})
  	.when('/events', {templateUrl:'events.html',  reloadOnSearch: false})
  	.when('/contact', {templateUrl:'contact.html',  reloadOnSearch: false})
  	.when('/clubs/:club_id', {templateUrl:'group_details.html',  reloadOnSearch: false})
    .when('/users/:user_id',{templateUrl:'profileView.html',reloadOnSearch:false})
    .when('/signup',{templateUrl:'signup.html',reloadOnSearch:false})
    .when('/addEvent/:club_id',{templateUrl:'addEvent.html',reloadOnSearch:false})
    .when('/addClub',{templateUrl:'addClub.html',reloadOnSearch:false})
    .when('/editUser/:user_id',{templateUrl:'editUser.html',reloadOnSearch:false});

});