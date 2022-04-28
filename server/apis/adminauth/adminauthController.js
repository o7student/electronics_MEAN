
const db = require('../../config/db')
var User = require('../adminauth/adminauthModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

/**
 * Register
 */
exports.register = function (req, res) {
  var formdata = req.body
  User.findOne({ email: formdata.email })
    .then(data => {
      if (data == null) {
        if (req.body.password != undefined && req.body.password != null && req.body.password != "") {
          var userobj = new User();
          userobj.email = req.body.email
          userobj.usertype = 'admin'
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(req.body.password, salt);
          userobj.password = hash
          userobj.save()
            .then(data => {
              res.status(200).send({ success: true, message: "Admin registered successfully", status: 200, user: data })
            })
        }
        else {
          res.status(409).send({ success: false, message: "Please Enter password", status: 400, user: [] })
        }
      } else {
        res.status(409).send({ success: false, message: "Already Exist Email", status: 409, user: [] })
      }
    })
}

/**
* Login
*/
exports.login = function (req, res) {
  // console.log("Controller",req.body)
  // return
  User.findOne({
    $and: [
      { email: req.body.email },
      { usertype: 'admin' }
    ]
  }).exec()
    .then(data => {
      // console.log(data)
      if (data != null) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          var privateKey = '132ABR2'
          var mydata = {
            _id: data._id,
            name: data.name
          }
          jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
            data: mydata
          }, privateKey,
            function (err, token) {
              res.send({ success: true, message: "Login successfully", status: 200, data: data, token: token })
            });
        }
        else {
          res.send({ success: true, message: "Invalid Username Password", status: 403, data: [] })
        }
      } else {
        res.send({ success: true, message: "Not Exist", status: 404, data: data })
      }
    })
}

/**
* Profile
*/
exports.profile = function (req, res) {
  User.findOne({
    $and: [
      { _id: req.body.user_id },
      { usertype: 'admin' }
    ]
  }).exec()
    .then(data => {
      if (data != null) {
        // console.log(data)
        res.send({ success: true, message: "Profile loaded", status: 200, data: data })
      } else {
        res.send({ success: true, message: "Not Exist", status: 404, data: data })
      }
    })
}

/**
 * Update Profile
 */
exports.updateprofile = function (req, res) {
  User.findOne({ _id: req.body.user_id })
    .then(data => {
      if (data != null) {
        // data.email = req.body.email
        data.name = req.body.name
        data.contact = req.body.contact
        data.address = req.body.address
        if (req.body.password != undefined && req.body.password !== '') {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(req.body.password, salt);
          data.password = hash
        }
        data.save().then(saveres => {
          res.send({ success: true, message: "Profile Updated", status: 200, data: saveres })
        }).catch(err => {
          res.send({ success: true, message: err.message, status: 500 })
        })
      }
      else {
        res.send({ success: false, message: "Profile Not Found", status: 404, data: [] })
      }
    })
}

/**
 * Change Password
 */
exports.changepassword = function (req, res) {
  console.log(req.body)
  User.findOne({ _id: req.body.user_id }).exec()
    .then(data => {
      if (data != null) {
        //compare old password
        if (req.body.new_password == req.body.confirm_password) {
          // console.log('Password Match')
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(req.body.new_password, salt);
          if (!bcrypt.compareSync(req.body.old_password, data.password)) {
            // console.log('Old password is incorrect')
            res.send({ success: true, message: "Old Password Not Correct", status: 200 })

          }
          else {
            // console.log('update New PAssword',hash)
            data.password = hash
            data.save().then(data2 => { })
            res.send({ success: true, message: "Password Changed Successfully", status: 200 })

          }
        }
        else {
          res.send({ success: false, message: "New Password and Confirm Password doesn't match", status: 409 })
        }

      }
      else {
        res.send({ success: true, message: "Not Exist", status: 404 })
      }
    })
}
/**
* All Users
*/
exports.allUsers = function (req, res) {
  User.find({
    $and: [
      { usertype: 'user' }
    ]
  }).exec()
    .then(data => {
      // console.log(data)
      res.send({ success: true, message: "Al Users loaded", status: 200, data: data })
    })
}
