/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var fs = require('fs')
  , path = require('path');

module.exports.bootstrap = function (cb) {
  // Whatever else you want to bootstrap...

  var postsSource = path.join(process.cwd(), 'attachments/images')
    , postsDest = path.join(process.cwd(), '.tmp/public/images/attachments');

  fs.symlink(postsSource, postsDest, function(err) {
    cb(err);
  });
};
