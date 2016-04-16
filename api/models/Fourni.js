
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Fourni = Schema({

    username    :  String,
    pays    :  String,
 ville   :  String,
   tel    :Number,
    debutabon:String,
    finabon:String,
});
module.exports = mongoose.model('Fourni', Fourni);