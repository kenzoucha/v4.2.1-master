var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var User = Schema({
    images: String,
    username    :  String,
    email       :  String,
    password    :  String,
    role        : {
        type: String, default: 'user'
    },
    activated   :  {
        type:Boolean, default: false
    }
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);