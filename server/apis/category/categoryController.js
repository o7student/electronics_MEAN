//categoryController.js
const fs = require('fs');
const db = require('../../config/db')
var Category = require('../category/categoryModel');

/**
 * Add Category
 */
exports.addcategory = function (req, res) {
    var formdata = req.body
    Category.findOne({ category_name: formdata.category_name })
        .then(async data => {
            if (data == null) {

                let total = await Category.countDocuments().exec();
                var categoryobj = new Category();
                categoryobj.category_name = formdata.category_name
                categoryobj.categoryId = total + 1
                // console.log("Total")
                if (req.file != undefined) {
                    var image = req.file
                    categoryobj.image = "images/categories/" + image.filename;
                }
                else {
                    categoryobj.image = "images/categories/default.jpg"
                }
                categoryobj.save()
                    .then(data => {
                        res.send({ success: true, message: "Category added successfully", status: 200, data: data })
                    })
            } else {
                res.send({ success: false, message: "Category Already Exist ", status: 409, data: [] })
            }
        })
}

/**
 * Get Category
 */
exports.getcategory = function (req, res) {
    Category.find().exec()
        .then(data => {
            res.send({ success: true, message: "Category loaded", status: 200, data: data })
        })
}
exports.getcustomercategory = function (req, res) {
    Category.find().exec()
        .then(data => {
            res.status(200).send({ success: true, message: "Category loaded", status: 200, data: data })
        })
}

/**
 * Get Category By Id
 */
exports.getcategorybyid = function (req, res) {
    Category.findOne({ _id: req.params.id })
        .then(data => {
            res.send({ success: true, message: "Category loaded", status: 200, data: data })
        })
}

/**
 * Update Category
 */
exports.updatecategory = function (req, res) {
    // console.log(req.params)
    // return
    Category.findOne({ _id: req.params.id })
        .then(async data => {
            if (data != null) {
                if (req.body.category_name != undefined)
                    data.category_name = req.body.category_name
                if (req.body.status != undefined)
                    data.status = req.body.status
                if (req.file != undefined) {
                    /**
                     * Unlink File Start
                     */
                    if (data.image != "images/categories/default.jpg") {
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
                    data.image = "images/categories/" + image.filename;
                }
                await data.save()
                res.send({ success: true, message: "Category Updated", status: 200 })
            }
            else {
                res.send({ success: false, message: "No Category Found", status: 404 })
            }
        })
}

/**
 * Delete Category
 */
exports.deletecategory = function (req, res) {
    Category.findOne({ _id: req.params.id })
        .then(data => {
            if (data != null) {
                /**
                 * Unlink File Start
                 */
                if (data.image != "images/categories/default.jpg") {
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
                Category.deleteOne({ _id: req.params.id })
                    .then(data => {
                        // console.log(data)
                    })
                    .catch(err => {
                        // console.log(err)
                    })
                res.send({ success: true, message: "Category Deleted", status: 200 })
            }
            else {
                res.status(404).send({ success: false, message: "No Category Found", status: 404 })
            }
        })
}
