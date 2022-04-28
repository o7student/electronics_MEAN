let router = require('express').Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs');
// const paths = require('../config/paths.json')

var categorycontroller = require('../apis/category/categoryController');
var subcategorycontroller = require('../apis/subCategory/subCategoryController');
var productcontroller = require('../apis/product/productController');
var authcontroller = require('../apis/adminauth/adminauthController');
var couponcontroller = require('../apis/coupon/couponController');
var advertisecontroller = require('../apis/advertise/advertiseController');
const ordercontroller = require('../apis/order/OrderController');

/**
 * Category Folder
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/categories/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })

/**
 * Sub Category Folder
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/subcategories/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var uploadsubcat = multer({ storage: storage })

/**
 * Products Image Folder
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/products/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var uploadproduct = multer({ storage: storage })
/**
 * Advertise Image Folder
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/advertises/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var uploadadvertise = multer({ storage: storage })

/**
 * Admin
 */
router.post('/register', authcontroller.register)
router.post('/login', authcontroller.login)
router.post('/profile', authcontroller.profile)
router.post('/updateprofile', authcontroller.updateprofile)
router.post('/allUsers', authcontroller.allUsers)
router.post('/changePassword', authcontroller.changepassword)


/**
 * Category Routes
 */
router.post('/addCategory', upload.single('image'), categorycontroller.addcategory)
router.get('/getCategory', categorycontroller.getcategory)
router.get('/getCategoryById/:id', categorycontroller.getcategorybyid)
router.post('/updateCategory/:id', upload.single('category_image'), categorycontroller.updatecategory)
router.delete('/deleteCategory/:id', categorycontroller.deletecategory)

/**
 * Sub Category Routes
 */
router.post('/addSubCategory', uploadsubcat.single('image'), subcategorycontroller.addSubcategory)
router.get('/getSubcategory', subcategorycontroller.getSubcategory)
router.get('/getSubcategorybyid/:id', subcategorycontroller.getSubcategorybyid)
router.post('/updateSubcategory/:id', uploadsubcat.single('subCategory_image'), subcategorycontroller.updateSubcategory)
router.delete('/deleteSubcategory/:id', subcategorycontroller.deleteSubcategory)

/**
 * Product Routes
 */
//  router.post('/addProduct',uploadproduct.single('image'),productcontroller.addproduct)
router.post('/addProduct', uploadproduct.fields([{ name: 'image', maxCount: 3 }]), productcontroller.addproduct)
router.get('/getProduct/:id', productcontroller.getproduct)
router.get('/getAllproduct', productcontroller.getAllproduct)
router.get('/getProductById/:id', productcontroller.getproductbyid)
router.post('/updateProduct/:id', uploadproduct.single('image'), productcontroller.updateproduct)
router.delete('/deleteProduct/:id', productcontroller.deleteproduct)

/**
 * Coupon
 */
router.route('/coupon')
  .get(couponcontroller.index)
  .post(couponcontroller.add);

router.route('/coupon/:id')
  .delete(couponcontroller.delete);

/**
 * Advertise
 */
router.route('/advertise')
  .get(advertisecontroller.index)
  .post(uploadadvertise.single('image'), advertisecontroller.add);

router.route('/advertise/:id')
  .delete(advertisecontroller.delete);

/**
* Orders
*/
router.post('/getAllOrders', ordercontroller.getallorders)
router.post('/getSingleOrder', ordercontroller.getmyordersdetail)
router.post('/changeOrderStatus', ordercontroller.ordersatus)


/**
 * Error Route
 */
router.all("*", function (req, res) {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Wrong Api Address"
  })
});

module.exports = router

