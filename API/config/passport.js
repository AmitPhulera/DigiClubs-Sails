var passport=require('passport'),
	LocalStrategy=require('passport-local').Strategy,
  FacebookStrategy=require('passport-facebook').Strategy,
	JwtStrategy=require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
var EXPIRES_IN_MINUTES = 60*60 * 24;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "digiclubs.com";
var AUDIENCE = "digiclubs.com";
 
/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};
 
/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  jwtFromRequest : ExtractJwt.fromAuthHeader(),
  passReqToCallback: false
};
 
/**
 * Triggers when user authenticates via local strategy
 */

var FB_STRATEGY_CONFIG={
  clientID:1164205113600754,
  clientSecret:'89af8525395bc25c6fc39a1f1754f015',
  callbackURL:'http://localhost:1337/auth/signinfb',
  profileFields: ['id', 'displayName', 'photos', 'email']

};

function _onLocalStrategyAuth(email, password, next) {
  Users.findOne({email: email})
    .exec(function (error, user) {
      if (error) return next(error, false, {});
 
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      });
 
      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });
 
      return next(null, user, {});
    });
}
 
/**
 * Triggers when user authenticates via JWT strategy 
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  Users.findOne(user)
    .exec(function (error, user) {
      if (error) return next(error, false, {});
 
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: 'Unauthorised User'
      });
  console.log('here broda');
  return next(null, user, {});
  });
}
/* passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/
function _onFacebookStrategyAuth(accessToken,refreshToken,profile,next){
  console.log('Displayin user profile');
  console.log(profile);
  Users.findOne({email:profile.emails[0].value})
    .exec(function (error, user) {
      if (error) return next(error, false, {});
 
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: 'Unauthorised User'
      });
  console.log('here broda');
  return next(null, user, {});
  });

}
passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
 passport.use(
  new FacebookStrategy(FB_STRATEGY_CONFIG, _onFacebookStrategyAuth));
module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};