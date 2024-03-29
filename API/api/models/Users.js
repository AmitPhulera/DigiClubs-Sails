module.exports = {
    schema: true,
    attributes: {
        name: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },
        branch:{
            type:'string'
        },
        photo: {
            type: 'string',
            defaultsTo: './images/default_user.jpg',
            url: true
        },
        socialProfiles: {
            type: 'object',
            defaultsTo: {}
        },
        roles:{
            collection:'roles',
            via:'user_id'
        },
        about:{
            type: 'string'
        },
        pushReigstarionId:{
            type:'string'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.socialProfiles;
            return obj;
        }
    },
    beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },
    beforeCreate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    }
};
