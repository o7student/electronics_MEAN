//index.js
let express = require('express')
let db = require('./config/db')
// const dotenv = require('dotenv');
var bodyParser = require('body-parser')
let app = express();
var cors = require('cors')
const feRoot = "dist/ecommerce";
const fallback = require('express-history-api-fallback');
const path = require('path');
app.use(cors())
var port = process.env.PORT || 3500;
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/public', express.static("server/public"));
// app.get('/', (req, res) => res.send('Welcome to E-Commerce Express'));
app.listen(port, function () {
  console.log("E-Commerce Express on Port " + port);
})
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const webadmin = require('./routes/webadmin')
let adminroutes = require("./routes/adminroutes.js")
let customerroutes = require("./routes/customerroutes.js")
// let api = require("./routes/api.js")

// console.log("api request")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/server/views'));
app.use('/webadmin/css', express.static(path.join(__dirname, 'public/css')));
app.use('/webadmin/js', express.static(path.join(__dirname, 'public/js')));
app.use("/webadmin/images'", express.static(path.join(__dirname, 'server/public/images')));

app.use('/admin', adminroutes)
app.use('/customer', customerroutes)
app.use('/webadmin', webadmin)

app.use(express.static(feRoot)).use(fallback('index.html', { root: feRoot }));
