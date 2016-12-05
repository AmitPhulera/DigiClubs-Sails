/**
 * Comments.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema:true,
	attributes: {
		name:{
			type:'string'
		},
	  	comment: {
	        type: 'string'
	    },
	    user:{
	    	model:'users'
	    },
	    post:{
	    	model:'posts'
	    },
	    // event:{
	    // 	model:'events'
	    // },
	    date:{
	    	type:'datetime'
	    }
	   
	}
};
