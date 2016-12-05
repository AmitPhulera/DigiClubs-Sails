/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */

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
function createJWT(user) {
    var payload = {
        id: user.id,
        email:user.email,
        name:user.name,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM');
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

  google: function(req, res) {
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        console.log(req.allParams());
        var params = {
            code: req.param('code'),
            client_id: '565734768883-dlunqnt9i927rajtrep3berc7msninff.apps.googleusercontent.com',
            client_secret: 'uoueTJ91o81uhdr3fQ6ZeOz0',
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };
        console.log(params);
        request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {

            var accessToken = token.access_token;

            var headers = { Authorization: 'Bearer ' + accessToken };
            console.log(headers);
            // Step 2. Retrieve profile information about the current user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({ message: profile.error.message });
                }
                console.log(profile);
                Users.findOne({email:profile.email})
                    .exec(function(error, user) {
                        if (error) return res.serverError(error);

                        if (!user) return res.forbidden({
                            code: 'E_USER_NOT_FOUND',
                            message: 'Unauthorised User'
                        });
                        var token = createJWT(user);
                        console.log(token);
                        return res.ok({ token: token });
                    });
            });
        });

    },
    facebook: function(req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: '89af8525395bc25c6fc39a1f1754f015',
            redirect_uri: req.body.redirectUri
        };
        console.log(params);
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    return res.status(500).send({ message: profile.error.message });
                }
                // Step 3a. Link user accounts.
                
                    console.log(profile);
                    Users.findOne({email:profile.email})
                    .exec(function(error, user) {
                        if (error) return res.serverError(error);

                        if (!user) return res.forbidden({
                            code: 'E_USER_NOT_FOUND',
                            message: 'Unauthorised User'
                        });
                        var token = createJWT(user);
                        console.log(token);
                        return res.ok({ token: token });
                    });
                
            });
        });

    },
  
};