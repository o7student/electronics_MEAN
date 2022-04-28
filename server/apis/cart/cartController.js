const fs = require('fs');
const db = require('../../config/db')
var Cart = require('../cart/cartModel');


/**
 * Add
 */
 exports.add = function (req, res) {
  var formdata = req.body
  var cart = new Cart();
  cart.category_id = formdata.category_id
  cart.product_id = formdata.product_id
  cart.user_id = formdata.user_id
  cart.quantity = formdata.quantity
  cart.save()
  .then(data => {
      res.status(200).send({ success: true, message: "Added to cart", status: 200, data: data })
  })
}

/**
* Get all
*/
exports.index = function (req, res) {
  Cart.find({user_id : req.params.user_id}).populate('category_id').populate('product_id')
  .then(data => {
      res.status(200).send({ success: true, message: "Cart loaded", status: 200, data: data })
  })
}

/**
* Delete
*/
exports.delete = function(req,res){
  Cart.findOne({_id:req.params.cart_id})
  .then(data=>{
      if(data!=null){
          Cart.deleteOne({_id:req.params.cart_id})
          .then(data=>{
              // console.log(data)
          })
          .catch(err=>{
              // console.log(err)
          })
          res.status(200).send({success:true,message:"Item removed from wishlist",status:200})
      }
      else{
          res.status(404).send({success:false,message:"Item not Found",status:404})
      }
  })
}

/**
* Delete
*/
exports.deletecart = function(req,res){
  console.log(req.params)
  Cart.findOne({user_id:req.params.user_id})
  .then(data=>{
      if(data!=null){
          Cart.deleteMany({user_id:req.params.user_id})
          .then(data1=>{
              // console.log(data1)
          })
          .catch(err=>{
              // console.log(err)
          })
          res.status(200).send({success:true,message:"Item removed from cart",status:200})
      }
      else{
          res.status(404).send({success:false,message:"Item not Found",status:404})
      }
  })
}

