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
	    photo:{
	    	type: 'string',
            defaultsTo: './images/default_event.jpg',
            
	    },
	    date:{
	    	type:'datetime'
	    },
	    privacy:{
	    	type:'string',
	    	enum: ['public','members', 'core']
	    },
	    branch:{
	    	type:'array'
	    	
	    },
	    clubs:{
	    	model:'clubs'
	    },
	    prereq:{
	    	type:'string',
	    },
	    seats:{
	    	type:'integer'
	    },
	    cost:{
	    	type:'integer'
	    },
	    duration:{
	    	type:'integer'
	    },
	    // comments:{

	    // },
	    reviews:{
	    	type:'integer'
	    }
	}
};

