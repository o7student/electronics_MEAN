var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var advertiseSchema = mongoose.Schema({
  title : { type:String},
  image : { type:String,default:''},
  status:{ type:Boolean,default:true},
  created_at: { type: Date, default: Date.now }
});

var advertise = module.exports = mongoose.model('advertise', advertiseSchema);
module.exports.get = function (callback, limit) {
    advertise.find(callback).limit(limit);
}
