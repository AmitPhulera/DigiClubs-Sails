var FCM = require('fcm-node');

var serverKey = 'AAAAg7hrgPM:APA91bGqcudRHNom10ulf4CXW-MYZY_dzMXAjXtP63j2pGyn07MDAw8gKr0E6DmMj3-6bq1f1EGYqMgOdDTKOkusN0MwXnc7JyS16N3ueJellKs5nlUWgXMxQy5JPqg21TpeydWWfe-VW6oDG7mYzkhvXbpTC7WhYQ';
var fcm = new FCM(serverKey);
module.exports = {
    send: function(data, done) {
        
        fcm.send(data, function(err, response) {
            if (err) {
                return done(err);
            } else {
                return done();
            }
        });

    }

};
