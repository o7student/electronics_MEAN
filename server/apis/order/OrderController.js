const fs = require('fs');
const db = require('../../config/db')
var Order = require('../order/orderModel');
var Product = require('../product/productModel');



/**
 * Get My Orders
 */

exports.getallorders = function (req, res) {
  Order.find().populate('order_detail.category_id').populate('order_detail.product_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Order loaded", status: 200, data: data })
    })
}

/**
 * Send Order
 */
exports.sendorder = async function (req, res) {
  // console.log(req.body)
  // return
  var formdata = req.body
  var orderobj = new Order();

  orderobj.user_id = formdata.user_id
  orderobj.name = formdata.name
  orderobj.email = formdata.email
  orderobj.shipping_address = formdata.shipping_address
  orderobj.card_number = formdata.card_number
  orderobj.cvv = formdata.cvv
  orderobj.expiry_date = formdata.expiry_date
  orderobj.contact = formdata.contact
  orderobj.is_coupoun_applied = formdata.is_coupoun_applied

  var orderdet = {}
  var total_amt = 0;
  if (req.body.category_id.length > 0) {
    for (var i = 0; i < req.body.category_id.length; i++) {
      var product_stock;
      await Product.findOne({ _id: formdata.product_id[i] })
        .then(async prodata => {
          if (prodata.stock == 0) {
            res.status(200).send({ success: true, message: "Insufficient Stock", status: 200 })
          }
          else if (prodata.stock < formdata.quantity[i]) {
            res.status(200).send({ success: true, message: "Insufficient Stock", status: 200 })
          }
          else {
            prodata.stock = prodata.stock - formdata.quantity[i]
            await prodata.save()
          }
        })
      orderdet.category_id = formdata.category_id[i]
      orderdet.product_id = formdata.product_id[i]
      orderdet.quantity = formdata.quantity[i]
      orderdet.price_per_item = formdata.price_per_item[i]
      orderobj.order_detail.push(orderdet)
      total_amt += (formdata.quantity[i] * formdata.price_per_item[i])
    }
    if (formdata.is_coupoun_applied) {
      orderobj.coupon_discount = formdata.coupon_discount
      orderobj.coupon_id = formdata.coupon_id
      orderobj.total_amount = total_amt - formdata.coupon_discount

    }
    else {
      orderobj.total_amount = total_amt
    }
  }
  orderobj.save()
    .then(data => {
      res.status(200).send({ success: true, message: "Order Placed Successfully", status: 200, data: data })
    })
}

/**
 * Detailed Order
 */
exports.getmyordersdetail = function (req, res) {
  Order.findOne({ _id: req.body.id }).populate('order_detail.category_id').populate('order_detail.product_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Order loaded", status: 200, data: data })
    })
}

/**
 * Get My Orders
 */

exports.getmyorders = function (req, res) {
  Order.find({ user_id: req.body.user_id }).populate('order_detail.category_id').populate('order_detail.product_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Order loaded", status: 200, data: data })
    })
}

/**
 * Change Order Status
 */
exports.ordersatus = function (req, res) {
  console.log('hi')
  Order.findOne({ _id: req.body.order_id })
    .then(data => {
      if (data != null) {
        data.order_status = req.body.order_status
        data.save()
        res.status(200).send({ success: true, message: "Order status Updated", status: 200 })
      }
      else {
        res.status(404).send({ success: false, message: "Order Not Exists", status: 404 })
      }
    })
}
exports.ordersatuscustomer = function (req, res) {
  console.log(req.params.order_id)
  Order.findOne({ _id: req.params.order_id })
    .then(data => {
      if (data != null) {
        data.order_status = req.body.order_status
        data.save()
        res.status(200).send({ success: true, message: "Order status Updated", status: 200 })
      }
      else {
        res.status(404).send({ success: false, message: "Order Not Exists", status: 404 })
      }
    })
}

/**
 * Post Reviews
 */
exports.addreview = function (req, res) {
  Order.findOne({ _id: req.body.order_id }).then(data => {
    if (data != "null") {
      var rev = {}
      rev.rate = req.body.rate
      rev.review = req.body.review

      data.review.push(rev)
      data.save()
        .then(data => {
          res.status(200).send({ success: true, message: "Review Added Successfully", status: 200 })
        })
    }
    else {
      res.status(404).send({ success: false, message: "Order Not Exists", status: 404 })
    }
  })
}
