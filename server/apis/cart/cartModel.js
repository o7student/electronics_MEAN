var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var cartSchema = mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category_id:{
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
    product_id:{
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity:{
      type: Number,
      default:1
    },
    created_at: { type: Date, default: Date.now }
});

var cart = module.exports = mongoose.model('cart', cartSchema);
module.exports.get = function (callback, limit) {
    cart.find(callback).limit(limit);
}
