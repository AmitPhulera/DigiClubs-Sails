/**
 * Roles.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema:true,
  attributes: {
  	role:{
  		type:'String'
  	},
  	club:{
  		model:'clubs'
  	},
  	user_id:{
  		model:'users'
  	}
  }
};
