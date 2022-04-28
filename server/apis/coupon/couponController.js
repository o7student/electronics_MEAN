const fs = require('fs');
const db = require('../../config/db')
var Coupon = require('../coupon/couponModel');

/**
 * Add
 */
exports.add = function (req, res) {
  var formdata = req.body
  var coupon = new Coupon();
  coupon.coupon_code = formdata.coupon_code
  coupon.offer_amount = formdata.offer_amount
  coupon.description = formdata.description
  coupon.save()
    .then(data => {
      res.send({ success: true, message: "Coupon added successfully", status: 200, data: data })
    })
}

/**
* Get all
*/
exports.index = function (req, res) {
  Coupon.find().exec()
    .then(data => {
      res.send({ success: true, message: "Coupon loaded", status: 200, data: data })
    })
}
exports.customercoupon = function (req, res) {
  Coupon.find().exec()
    .then(data => {
      res.status(200).send({ success: true, message: "Coupon loaded", status: 200, data: data })
    })
}
exports.customercouponbyid = function (req, res) {
  Coupon.findOne({ _id: req.params.id }).exec()
    .then(data => {
      res.status(200).send({ success: true, message: "Coupon loaded", status: 200, data: data })
    })
}

// /**
// * Get by id
// */
// exports.index = function (req, res) {
//   Coupon.findOne({_id:req.params.id}).exec()
//   .then(data => {
//       res.status(200).send({ success: true, message: "Coupon loaded", status: 200, data: data })
//   })
// }

/**
* Delete
*/
exports.delete = function (req, res) {
  Coupon.findOne({ _id: req.params.id })
    .then(data => {
      if (data != null) {
        Coupon.deleteOne({ _id: req.params.id })
          .then(data => {
            // console.log(data)
          })
          .catch(err => {
            // console.log(err)
          })
        res.status(200).send({ success: true, message: "Coupon Deleted", status: 200 })
      }
      else {
        res.status(404).send({ success: false, message: "Coupon not Found", status: 404 })
      }
    })
}
