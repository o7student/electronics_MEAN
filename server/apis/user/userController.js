var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {        type: String,        default:''    },
    email: { type: String,        required: true, default:'',trim: true, unique: true },
    username:{        type:String,        default: ''    },

    phone:{        type:Number,        default:0    },
    password:{        type:String,        default:""    },
    status: {        type: Boolean,        default:true    },
    created_at: {        type: Date,        default: Date.now    }
});
// Export user Model
var user = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}
