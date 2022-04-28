const express = require('express')
const router = express();
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const localStorage = require('localStorage')

const db = require('../../server/config/db')
var Category = require('../apis/category/categoryModel');
var Product = require('../apis/product/productModel');
const Users = require('../apis/adminauth/adminauthModel')
const Order = require('../apis/order/orderModel')

router.get('/', async (req, res) => {
  var title = 'Admin Dashboard'
  let isLoggedIn = localStorage.getItem('isLoggedIn')
  if(isLoggedIn==true || isLoggedIn=='true'){
    await Order.find().populate('user_id').then(orderData => {

      res.render('index', { 'title': title, 'data': orderData });

    })
  }else{
    res.redirect('/webadmin/login')
  }


});

//controllers
const categorycontroller = require('../apis/category/categoryController');
const couponcontroller = require('../apis/coupon/couponController');
const advertisecontroller = require('../apis/advertise/advertiseController');
const productController = require('../apis/product/productController')
const adminauthController = require('../apis/adminauth/adminauthController')

const { title } = require('process');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("In Desitmation")
    cb(null, './server/public/images/categories/')
  },
  filename: function (req, file, cb) {
    // console.log("In Saving")
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })

/**
 * Products Image Folder
 */
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/images/products/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
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
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
var uploadadvertise = multer({ storage: storage })


/**
 * Get All Category
 */
router.get('/allcategory', async (req, res) => {
  var title = "All Categories";
  await categorycontroller.getcategory(req, function (resp) {
    if (resp.status == 200) {
      res.render('category/allcat', { 'title': title, 'data': resp.data });
    }
  })
});
/**
 * Add Category Form
 */
router.get('/addcategory', async (req, res) => {
  var title = "Add Category";
  await categorycontroller.getcategory(req, function (resp) {
    if (resp.status == 200) {
      res.render('category/addcat', { 'title': title, 'data': resp.data });
    }
  })
});

/**
 * Store Category
 */
router.post('/addcategory', upload.single('category_image'), async (req, res) => {
  var title = "Add Category";
  categorycontroller.addcategory(req, async function (resp) {
    let data = []
    await categorycontroller.getcategory(req, function (resp2) {
      data = resp2.data
      if (resp.status == 200) {
        res.render('category/addcat', { 'title': title, 'info': resp.message, 'data': data });
      } else {
        res.render('category/addcat', { 'title': title, 'error': resp.message, 'data': data });
      }
    })
  })
});
router.get('/updatecat', async (req, res) => {
  var title = "All Categories";
  await categorycontroller.getcategory(req, function (resp) {
    if (resp.status == 200) {
      res.render('category/allcat', { 'title': title, 'data': resp.data });
    }
  })
});

/**
 * Edit Category Form
 */
router.get('/editcategory/:id', async (req, res) => {
  var title = "Edit Category";
  categorycontroller.getcategorybyid(req, function (resp) {
    if (resp.status == 200) {
      res.render('category/editcat', { 'title': title, 'data': resp.data });
    }
  })
});

/**
 * Update Category
 */
router.post('/updatecategory/:id', upload.single('category_image'), async (req, res) => {
  var title = "Update Category";
  categorycontroller.updatecategory(req, function (resp) {
    if (resp.status == 200) {
      res.render('category/allcat', { 'title': title, 'info': resp.message });
    } else {
      res.render('category/allcat', { 'title': title, 'error': resp.message });
    }
  })
});

/**
 * Enable Disable Catgeory
 */
router.get('/changecategorystatus/:id/:status', async (req, res) => {
  var title = "All Category";
  Category.findOne({ _id: req.params.id })
    .then(data => {
      if (data != null) {
        data.status = req.params.status
        data.save()
        res.render('category/allcat', { 'title': title, resp: "Category Status Changed", status: 200 })
      }
      else {
        res.render('category/allcat', { 'title': title, 'error': resp.message });
      }
    })
});
router.post('/updatecat', upload.single('category_image'), async (req, res) => {
  var title = "All Categories";
  categorycontroller.updatecategory(req, async function (resp) {
    let data = []
    await categorycontroller.getcategory(req, function (resp2) {
      data = resp2.data
      if (resp.status == 200) {
        res.render('category/allcat', { 'title': title, 'info': resp.message, 'data': data });
      } else {
        res.render('category/allcat', { 'title': title, 'error': resp.message, 'data': data });
      }
    })

  })
});

/**
 * Get All User
 */
router.get('/allUser', async (req, res) => {
  var title = "All Users";
  let userData = []
  userData = await Users.find({ usertype: 'user' })
  res.render('user/allUser', { 'title': title, 'data': userData });
});

/**
 * Add Product
 */
router.get('/addProduct',async(req,res) =>{
  var title = "Add Products";
  await categorycontroller.getcategory(req, function (resp) {
    if (resp.status == 200) {
      res.render('product/addProduct', { 'title': title, 'data': resp.data });
    }
  })
});
/**
 * Store Product
 */
 router.post('/addProduct', uploadproduct.fields([ { name: 'image', maxCount: 3 }]), async (req, res) => {
  var title = "Add Product";
  await productController.addproduct(req, async function (resp) {
    // console.log(resp)
    if (resp.status == 200) {
      await categorycontroller.getcategory(req, function (resp2) {
        if (resp.status == 200) {
          res.render('product/addProduct', { 'title': title,'info': resp.message, 'data': resp2.data });
        }
      })

    } else {
      res.render('product/addProduct', { 'title': title, 'error': resp.message, 'data': resp });
    }
  })
});

/**
 * Get All Product
 */
router.get('/allProduct', async (req, res) => {
  var title = "All Products";

  await productController.getAllproduct(req, resp => {
    // console.log("HELLO")
    // return
    if (resp.status == 200) {
      res.render('product/allProduct', { 'title': title, 'data': resp.data });
    }
  })

});

/**
 * Product Details
 */
router.get('/productDetails', async (req, res) => {
  var title = "Product Details";

  req.params.id = req.query.id
  await productController.getproductbyid(req, resp => {


    if (resp.status == 200) {
      // console.log(resp.data)
      res.render('product/productDetails', { 'title': title, 'product': resp.data });
    }
  })

});

/**
 * Enable Disable   Product
 */
 router.post('/updatepro',uploadproduct.fields([ { name: 'image', maxCount: 3 }]), async (req, res) => {
  var title = "All Products";
  await Product.findOne({ _id: req.body.id })
    .then(async data => {
      if (data != null) {
        data.status = req.body.status
        await data.save()
        res.redirect('/webadmin/allProduct')
        // res.render('product/allProduct',{ 'title': title, message: "Product Updated", status: 200 })
      }
      else {
        res.redirect('/webadmin/allProduct')
      }
    });
});
/**
 * Update Product
 */

router.post('/updateprodut', upload.single('category_image'), async (req, res) => {
  var title = "All Products";
  productController.updateproduct(req, async function (resp) {
    let data = []
    res.redirect('/webadmin/allProduct')
  })
});

/**
 * change Order Status
 */
 router.post('/updateorderstatus', async (req, res) => {
  var title = "All Orders";
  await Order.findOne({ _id: req.body.id })
    .then(async data => {
      if (data != null) {
        data.order_status = req.body.order_status
        await data.save()
        res.redirect('/webadmin/allOrder')
      }
      else {
        res.redirect('/webadmin/allProduct')
      }
    });
});
/**
 * Get All Order
 */
router.get('/allOrder', async (req, res) => {
  var title = "All Orders";

  await Order.find().populate('user_id').then(orderData => {

    res.render('order/allOrder', { 'title': title, 'data': orderData });

  })

});

/**
 * order Details
 */
 router.get('/orderDetails', async (req, res) => {
  var title = "Order Details";

  req.params.id = req.query.id
  await Order.findOne({_id:req.params.id}).populate('user_id').populate('order_detail.category_id').populate('order_detail.product_id').then(orderData => {
    // console.log(orderData)
    res.render('order/orderDetails', { 'title': title, 'data': orderData });
  })

});




/**
 * Add Coupon Form
 */
 router.get('/addcoupon', async (req, res) => {
  var title = "Add Coupon";
  await couponcontroller.index(req, function (resp) {
    if (resp.status == 200) {
      res.render('coupon/addcoup', { 'title': title, 'data': resp.data });
    }
  })
});

/**
 * Store Category
 */
router.post('/addcoupon', async (req, res) => {
  var title = "Add Coupon";
  couponcontroller.add(req, async function (resp) {
    let data = []
    await couponcontroller.index(req, function (resp2) {
      data = resp2.data
      if (resp.status == 200) {
        res.render('coupon/addcoup', { 'title': title, 'info': resp.message, 'data': data });
      } else {
        res.render('coupon/addcoup', { 'title': title, 'error': resp.message, 'data': data });
      }
    })
  })
});

/**
 * Add Banner Form
 */
 router.get('/addbanner', async (req, res) => {
  var title = "Add Advertise";
  await advertisecontroller.index(req, function (resp) {
    if (resp.status == 200) {
      res.render('advertise/addadvertise', { 'title': title, 'data': resp.data });
    }
  })
});

/**
 * Store Banner
 */
router.post('/addbanner',uploadadvertise.single('image'), async (req, res) => {
  var title = "Add Advertise";
  advertisecontroller.add(req, async function (resp) {
    let data = []
    await advertisecontroller.index(req, function (resp2) {
      data = resp2.data
      if (resp.status == 200) {
        res.render('advertise/addadvertise', { 'title': title, 'info': resp.message, 'data': data });
      } else {
        res.render('advertise/addadvertise', { 'title': title, 'error': resp.message, 'data': data });
      }
    })
  })
});

/**
 *login
 */
 router.get('/login', async (req, res) => {
  res.render('login', { error: null });
});
router.post('/loginCred', async (req, res) => {
  var title = 'Admin Dashboard'
  // console.log("Out Body",req.body)
  adminauthController.login(req, function(resp){
        // console.log("Respoonse data")
        // console.log(resp)
        // console.log("status =>",resp.status)
        // console.log("user_id =>",resp.data._id)
        if(resp.status==200){
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('user_id', resp.data._id);
          res.redirect('/webadmin/')
        }else{
            res.render('login', { error: "Invalid Username Password" });
        }
  })
});


/**
 * Profile
 */
router.get('/profile', async (req, res) => {
   var title = "Profile";
   let user_id = localStorage.getItem('user_id')
  //  console.log(user_id)
  //  return
  if(user_id == null)
  {
    res.redirect('/webadmin/')
  }
  else{

    await Users.findOne({
      $and:[
          {_id:user_id},
          {usertype:'admin'}
      ]
    }).exec()
    .then(data1=>{
      if(data1!=null){
        // console.log(data1)
            res.render('profile/profile',{ 'title': title,'success': true, 'info': "Profile loaded", 'data': data1 })
        } else{
            res.render('profile/profile',{'title': title,'success':true,'info':"Not Exist",'data':data1})
        }
    })
  }
});
/**
 * Change Password
 */
router.get('/changepassword', async (req, res) => {
   var title = "Change Password";
   let user_id = localStorage.getItem('user_id')
  //  console.log(user_id)
  //  return
  if(user_id == null)
  {
    res.redirect('/webadmin/')
  }
  else{
      res.render('changepassword/changepassword',{ 'title': title,'user_id':user_id })
  }
});
/**
 * Update Password
 */
router.post('/updatepassword', async (req, res) => {
   var title = "Change Password";
   let user_id = localStorage.getItem('user_id')
  //  console.log(user_id)
  //  return
  if(user_id == null)
  {
    res.redirect('/webadmin/')
  }
  else{
    // res.render('changepassword/changepassword',{ 'title': title,'user_id':user_id })
     adminauthController.changepassword(req, function(resp){

      if (resp.status == 200) {
        res.render('changepassword/changepassword', { 'title': title, 'info': resp.message,'user_id':user_id });
      } else {
        res.render('changepassword/changepassword', { 'title': title, 'error': resp.message,'user_id':user_id });
      }
     })
  }
});
/**
 * Update Profile
 */
 router.post('/updateprofile',async (req, res) => {
  var title = "Update Profile";
  let user_id = localStorage.getItem('user_id')
  adminauthController.updateprofile(req, function (resp) {
    if (resp.status == 200) {
      Users.findOne({
        $and:[
            {_id:user_id},
            {usertype:'admin'}
        ]
      }).exec()
      .then(data1=>{
        if(data1!=null){
          // console.log(data1)
              res.render('profile/profile',{ 'title': title,'success': true, 'info': "Profile loaded", 'data': data1 })
          } else{
              res.render('profile/profile',{'title': title,'success':true,'info':"Not Exist",'data':data1})
          }
      })
      // res.render('profile/allcat', { 'title': title, 'info': resp.message });
    } else {
      Users.findOne({
        $and:[
            {_id:user_id},
            {usertype:'admin'}
        ]
      }).exec()
      .then(data1=>{
        if(data1!=null){
          // console.log(data1)
              res.render('profile/profile',{ 'title': title,'success': true, 'info': "Profile loaded", 'data': data1 })
          } else{
              res.render('profile/profile',{'title': title,'success':true,'info':"Not Exist",'data':data1})
          }
      })

    }
  })
});

/**
 * Logout
 */
router.get('/logout', async (req, res) => {
  localStorage.setItem('isLoggedIn', false)
  localStorage.removeItem('user_id')
  res.redirect('/webadmin/')//res.render('login', { msg: "Logout Sucessfull" });
});
module.exports = router;
