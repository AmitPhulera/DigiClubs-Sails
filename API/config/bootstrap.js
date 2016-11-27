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

  /*var postsSource = path.join(process.cwd(), 'attachments/images/profile')
    , postsDest = path.join(process.cwd(), '.tmp/public/images/profile');

  var postsSource1 = path.join(process.cwd(), 'attachments/images/events')
    , postsDest1= path.join(process.cwd(), '.tmp/public/images/events');

  fs.symlink(postsSource, postsDest, function(err) {
    fs.symlink(postsSource1, postsDest1, function(err) {
    cb(err);
  });
  });*/
 
 cb();
};
