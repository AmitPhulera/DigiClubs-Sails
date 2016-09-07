/**
 * Posts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
	schema:true,
	attributes: {
	  	name: {
	            type: 'string',
	    },
	    post: {
	        type: 'string'
	    },
	    date:{
	    	type:'datetime'
	    },
	    privacy:{
	    	type:'string',
	    	enum: ['public','members', 'core']
	    },
	    postedIn:{
	    	model:'clubs'
	    },
	    user:{
	    	model:'users'
	    },
	    comments:{
	    	collection:'comments',
	    	via:'post'
	    }
	}
};

