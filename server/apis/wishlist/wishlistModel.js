var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var wishlistSchema = mongoose.Schema({
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
    created_at: { type: Date, default: Date.now }
});

var wishlist = module.exports = mongoose.model('wishlist', wishlistSchema);
module.exports.get = function (callback, limit) {
    wishlist.find(callback).limit(limit);
}
