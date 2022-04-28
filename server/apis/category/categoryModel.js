//categoryModel.js - common category
var mongoose = require('mongoose');//schema
var categorySchema = mongoose.Schema({
    categoryId: { type: Number},
    category_name: { type: String, required: true},
    image:{type:String, default:""},
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }

});
// Export category Model
var category = module.exports = mongoose.model('category', categorySchema);
module.exports.get = function (callback, limit) {
    category.find(callback).limit(limit);
}
