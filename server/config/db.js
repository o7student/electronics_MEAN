//require('dotenv').config();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbPath = 'mongodb://localhost:27017/electronics'

const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options); mongo.then(() => {
    console.log('DB Connected');
}, error => {
    console.log(error, 'error');
});

exports.isValid = function (id) {
    return mongoose.Types.ObjectId.isValid(id)
}
