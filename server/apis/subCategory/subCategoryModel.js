//categoryModel.js - common category
var mongoose = require('mongoose');//schema
var subCategorySchema = mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "category" },
    subCategoryId: { type: Number },
    subCategory_name: { type: String, required: true },
    image: { type: String, default: "" },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }

});
// Export subCategory Model
var subCategory = module.exports = mongoose.model('subCategory', subCategorySchema);
module.exports.get = function (callback, limit) {
    subCategory.find(callback).limit(limit);
}
