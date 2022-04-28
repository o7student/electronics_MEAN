var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var couponSchema = mongoose.Schema({
  coupon_code : { type:String,required:true},
  offer_amount : { type:String,required:true},
  description : { type:String},
  status:{ type:Boolean,default:true},
  created_at: { type: Date, default: Date.now }
});

var coupon = module.exports = mongoose.model('coupon', couponSchema);
module.exports.get = function (callback, limit) {
    coupon.find(callback).limit(limit);
}
