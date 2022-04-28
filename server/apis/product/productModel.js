//productModel.js - common product
var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var productSchema = mongoose.Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory_id: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    product_name: { type: String, },
    product_price: { type: String, },
    description: { type: String, },
    author_name: { type: String, },
    view_count: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    image: [{ type: String, default: "" }],
    // gallery: [{ type:String, default:""}],
    status: { type: Boolean, default: true },
    discount_applicable: { type: Boolean, default: false },
    discounted_price: { type: Number, default: "" },
    created_at: { type: Date, default: Date.now }
});

// Export product Model
var product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    product.find(callback).limit(limit);
}
