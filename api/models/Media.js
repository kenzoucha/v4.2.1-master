var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship');

var Media = new Schema({
    name            : String,
    _userId         : {type:Schema.ObjectId, ref: 'User', childPath:'image'},
    _productId      : {type: Schema.Types.ObjectId, ref: 'Product', childPath: 'images'}
});

Media.plugin(relationship, {relationshipPathName: '_productId'});
Media.plugin(relationship, {relationshipPathName: '_userId'});
module.exports = mongoose.model('Media', Media);