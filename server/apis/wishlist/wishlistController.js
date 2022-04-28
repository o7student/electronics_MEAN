const fs = require('fs');
const db = require('../../config/db')
var Wishlist = require('../wishlist/wishlistModel');


/**
 * Add
 */
 exports.add = function (req, res) {
  var formdata = req.body
  var wishlist = new Wishlist();
  wishlist.category_id = formdata.category_id
  wishlist.product_id = formdata.product_id
  wishlist.user_id = formdata.user_id
  wishlist.save()
  .then(data => {
      res.status(200).send({ success: true, message: "Added to wishlist", status: 200, data: data })
  })
}

/**
* Get all
*/
exports.index = function (req, res) {
  Wishlist.find({user_id : req.params.user_id}).populate('category_id').populate('product_id')
  .then(data => {
      res.status(200).send({ success: true, message: "Wishlist loaded", status: 200, data: data })
  })
}

/**
* Delete Product
*/
exports.delete = function(req,res){
  Wishlist.findOne({_id:req.params.wishlist_id})
  .then(data=>{
      if(data!=null){
          Wishlist.deleteOne({_id:req.params.wishlist_id})
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
