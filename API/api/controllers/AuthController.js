/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportfbAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);
  res.set("content-type", "*");
  return res.jsonp({
    // TODO: replace with new type of cipher service
    token: CipherService.createToken(user),
    user: user
  });
}
function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);
  res.set("Access-Control-Allow-Origin", "*");
  return res.ok({
    // TODO: replace with new type of cipher service
    token: CipherService.createToken(user),
    user: user
  });
}
 
module.exports = {
  /**
   * Sign up in system
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signup: function (req, res) {
    Users
      .create(_.omit(req.allParams(), 'id'))
      .then(function (user) {
        return {
          // TODO: replace with new type of cipher service
          token: CipherService.createToken(user),
          user: user
        };
      })
      .then(res.created)
      .catch(res.serverError);
  },
 
  /**
   * Sign in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signin: function (req, res) {
    
    passport.authenticate('local', 
      _onPassportAuth.bind(this, req, res))(req, res);
  },
  signinfb:function(req,res){
     passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_friends','email','user_about_me'] }, _onPassportfbAuth.bind(this, req, res))(req, res);
  }
};