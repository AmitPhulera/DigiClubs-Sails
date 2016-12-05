/**
 * EventsController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
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
	}
};

