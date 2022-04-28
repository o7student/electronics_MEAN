let router = require('express').Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs');
// const paths = require('../config/paths.json')

var categorycontroller = require('../apis/category/categoryController');
var subCategorycontroller = require('../apis/subCategory/subCategoryController');
var productcontroller = require('../apis/product/productController');
var authcontroller = require('../apis/customerauth/customerauthController');
var ordercontroller = require('../apis/order/OrderController');
var wishlistcontroller = require('../apis/wishlist/wishlistController');
var cartcontroller = require('../apis/cart/cartController');
var couponcontroller = require('../apis/coupon/couponController');
var advertisecontroller = require('../apis/advertise/advertiseController');

/**
 * Customer
 */
router.post('/register', authcontroller.register)
router.post('/login', authcontroller.login)
router.get('/login', (req, res) => {
  console.log("Request", req.body)
})
router.post('/profile', authcontroller.profile)
router.post('/updateprofile', authcontroller.updateprofile)
router.post('/changepassword', authcontroller.changepassword)

/**
 * Category Routes
 */
router.get('/getCategory', categorycontroller.getcustomercategory)
router.get('/getCategoryById/:id', categorycontroller.getcategorybyid)

/**
 *Sub Category Routes
 */

router.post('/getSubCategory', subCategorycontroller.getSubcategory)
router.get('/getSubCategoryById/:id', subCategorycontroller.getcustomerSubcategorybyid)

/**
 * Product Routes
 */
router.get('/getAllproduct', productcontroller.cutomergetAllproduct)
router.get('/getProductById/:id', productcontroller.customergetproductbyid)
router.get('/getDiscountedProduct', productcontroller.getdiscountedproduct)
router.get('/customergetproductbycategory/:id', productcontroller.customergetproductbycategory)
router.get('/customergetproductbysubcategory/:id', productcontroller.customergetproductbysubcategory)

/**
 * Order Routes
 */
router.route('/order')
  .post(ordercontroller.sendorder);

router.route('/order/:order_id')
  .patch(ordercontroller.ordersatus);

router.route('/myorder')
  .post(ordercontroller.getmyorders);

router.route('/myorder/:id')
  .get(ordercontroller.getmyordersdetail);

router.route('/ordersatuscustomer/:id')
  .patch(ordercontroller.ordersatuscustomer);
/**
 * Review
*/
router.route('/reviews')
  .post(ordercontroller.addreview);

/**
 * Wishlist
 */
router.route('/wishlist')
  .post(wishlistcontroller.add);

router.route('/wishlist/:user_id')
  .get(wishlistcontroller.index);
router.route('/wishlist/:wishlist_id')
  .delete(wishlistcontroller.delete);

/**
 * Cart
 */
router.route('/cart')
  .post(cartcontroller.add);

router.route('/cart/:user_id')
  .get(cartcontroller.index);

router.route('/cart/:cart_id')
  .delete(cartcontroller.delete);

router.route('/deletecart/:user_id')
  .delete(cartcontroller.deletecart);


/**
 * Coupon
 */

router.route('/coupon')
  .get(couponcontroller.customercoupon)

router.route('/coupon/:id')
  .get(couponcontroller.customercouponbyid);

/**
 * Advertise
 */

router.route('/advertise')
  .get(advertisecontroller.customerindex);


/******************************/
router.all("*", function (req, res) {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Wrong Api Address"
  })
});

/**
 * Coupon
 */
module.exports = router

