const fs = require('fs');
const db = require('../../config/db')
var Product = require('../product/productModel');


/**
 * Add Product
 */
exports.addproduct = function (req, res) {
  // console.log("Hello")
  // return
  var formdata = req.body
  var productobj = new Product();
  productobj.category_id = formdata.category_id
  productobj.product_name = formdata.product_name
  productobj.product_price = formdata.product_price
  productobj.description = formdata.description
  productobj.author_name = formdata.author_name
  productobj.stock = formdata.stock
  if (formdata.subCategory_id != undefined)
    productobj.subCategory_id = formdata.subCategory_id

  if (req.body.status != undefined)
    productobj.status = req.body.status

  if (formdata.discount_applicable) {
    productobj.discount_applicable = formdata.discount_applicable
    productobj.discounted_price = formdata.discounted_price
  }
  else {
    productobj.discount_applicable = formdata.discount_applicable
  }

  if (req.files != undefined && req.files.image.length > 0) {
    // console.log("HEllo")
    req.files.image.forEach(element => {
      productobj.image.push("images/products/" + element.filename)
    });
  }

  productobj.save()
    .then(data => {
      res.send({ success: true, message: "Product added successfully", status: 200, tech: data })
    })
}

/**
* Get Product
*/
exports.getproduct = function (req, res) {
  Product.find({ brand_id: req.params.id }).exec()
    .then(data => {

      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}

exports.getAllproduct = function (req, res) {
  // console.log("Data HELLO")
  // return
  Product.find().populate('category_id').populate('subCategory_id')
    .then(data => {
      res.send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}

exports.cutomergetAllproduct = function (req, res) {
  Product.find({ status: true }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}

/**
* Get Product By Id
*/
exports.getproductbyid = function (req, res) {
  Product.findOne({
    $and: [
      { _id: req.params.id },
      { status: true }
    ]
  }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}
exports.customergetproductbyid = function (req, res) {
  Product.findOne({
    $and: [
      { _id: req.params.id },
      { status: true }
    ]
  }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}
exports.customergetproductbycategory = function (req, res) {
  Product.find({
    $and: [
      { category_id: req.params.id },
      { status: true }
    ]
  }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}
exports.customergetproductbysubcategory = function (req, res) {
  Product.find({
    $and: [
      { subCategory_id: req.params.id },
      { status: true }
    ]
  }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}

/**
* Update Product
*/
exports.updateproduct = function (req, res) {
  // console.log("req",req.body)
  Product.findOne({ _id: req.params.id })
    .then(data => {
      if (data != null) {
        data.category_id = req.body.category_id
        data.product_name = req.body.product_name
        data.product_price = req.body.product_price
        data.description = req.body.description
        data.stock = req.body.stock
        data.author_name = req.body.author_name
        if (req.body.subCategory_id != undefined)
          data.subCategory_id = req.body.subCategory_id

        if (req.file != undefined) {
          /**
           * Unlink File Start
           */
          if (data.image != "images/products/default.jpg") {
            var deleteFile = "server/public/" + data.image
            fs.unlink(deleteFile, (err) => {
              if (err) {
                // console.log(err);
              }
              // console.log('deleted');
            })
          }
          /**
           * Unlink File Ends
           */
          var image = req.file
          data.image = "images/products/" + image.filename;
        }
        // console.log("data",data)
        data.save().then(saveres=>{
          res.send({ success: true, message: "Product Updated", status: 200 })
        }).catch(err=>{
          res.send({ success: false, message:err.message, status: 500 })
        })

      }
      else {
        res.send({ success: false, message: "No Product Found", status: 404 })
      }
    })
}


/**
* Delete Product
*/
exports.deleteproduct = function (req, res) {
  Product.findOne({ _id: req.params.id })
    .then(data => {
      if (data != null) {
        /**
         * Unlink File Start
         */
        if (data.image != "images/products/default.jpg") {
          var deleteFile = "server/public/" + data.image
          fs.unlink(deleteFile, (err) => {
            if (err) {
              //  console.log(err);
            }
            //  console.log('deleted');
          })
        }
        /**
         * Unlink File Ends
         */
        Product.deleteOne({ _id: req.params.id })
          .then(data => {
            // console.log(data)
          })
          .catch(err => {
            // console.log(err)
          })
        res.status(200).send({ success: true, message: "Product Deleted", status: 200 })
      }
      else {
        res.status(404).send({ success: false, message: "No Product Found", status: 404 })
      }
    })
}

/**
* Get Discounted Product
*/
exports.getdiscountedproduct = function (req, res) {
  Product.find({ discount_applicable: true }).populate('category_id').populate('subCategory_id')
    .then(data => {
      res.status(200).send({ success: true, message: "Product loaded", status: 200, data: data })
    })
}

