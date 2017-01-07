/**
 * EventsController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 
var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: n,
            notification: {
                title: 'Notification',
                body: 'This is check'
            },

            data: { //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
*/
module.exports = {

	upload: function(req,res)
	{	var eventid = req.param('eventid');
		req.file('file').upload({ dirname: sails.config.appPath+'/attachments/images/events/' , saveAs: eventid+'.jpg' }, function(err, files) {
            if (err)
                return res.serverError(err);
            var theurl = req.baseUrl + '/images/events/'+eventid+'.jpg';
            Events.update({'id':eventid},{'photo' : theurl}).exec(function(err, data) {
                if (err)
                    console.log(err);
                else
                    return res.ok({
                        message: files.length + ' file(s) uploaded successfully!',
                        files: files,
                        user:data
                    });
            });
        });
	},
    create:function(req,res)
    {
        var event=req.param('event');
        Events.create(event).exec(function(err,data){
            if(err)
                return res.serverError(err);
            notification={title:data.name,body:"A New Event For You "};
            data={
                url:'./#/events/'+data.id
            };
            
            fcmObj={
                to:'digiclubs',
                notification:this.notification,
                data:this.data
            };
            console.log(fcmObj);
            PushService.send(fcmObj,function(){
                return res.ok(data);
            });

            
        });
    }
};

 