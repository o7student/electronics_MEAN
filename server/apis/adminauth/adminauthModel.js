var mongoose = require('mongoose');//schema
var userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    contact: { type: Number, },
    address: { type: String, },
    usertype: { type: String, default:'user'},
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});
// Export user Model
var user = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}
