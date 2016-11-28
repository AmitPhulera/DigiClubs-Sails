/**
 * Feedback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		pros : {
  			type :'string'
  		},
  		cons : {
  			type : 'string'
  		},
  		suggestion : {
  			type : 'string'
  		},
  		rating_ui : {
  			type : 'integer'
  		},
  		rating_performance : {
  			type : 'integer'
  		},
  		rating_usability : {
  			type : 'integer'
  		},
      id : {
        model:'users'
      }

  }
};