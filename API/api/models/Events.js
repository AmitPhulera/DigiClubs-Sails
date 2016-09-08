/**
 * Events.js
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
	    user:{
	    	model:'Users'
	    },
	    date:{
	    	type:'datetime'
	    },
	    privacy:{
	    	type:'string',
	    	enum: ['public','members', 'core']
	    },
	    clubs:{
	    	model:'clubs'
	    },
	    reviews:{
	    	type:'number'
	    }
	}
};

