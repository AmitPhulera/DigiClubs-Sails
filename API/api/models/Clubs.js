/**
 * Clubs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

/**
 * Clubs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema: true,
  	attributes: {
  		name: {
	        type: 'string',
	    },
	    detail: {
	        type: 'string'
	    },
	    branches:{
			type:'array'
		},
	    photo:{
	    	type: 'string',
            defaultsTo: './images/default_club.jpg',
            url: true
	    },
		reviews:{
			type:'integer',
		},
		events:{
			collection:'events',
			via:'clubs'
		},
	    role:{
	    	collection:'roles',
	    	via:'club'
	    },
	    faculty:{
	    	type:'string'
	    },
	}
};


