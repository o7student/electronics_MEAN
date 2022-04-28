//subcategoryController.js
const fs = require('fs');
const db = require('../../config/db')
var SubCategory = require('./subCategoryModel');

/**
 * Add SubCategory
 */
exports.addSubcategory = function (req, res) {
    var formdata = req.body
    SubCategory.findOne({ subCategory_name: formdata.subCategory_name })
        .then(async data => {
            if (data == null) {

                let total = await SubCategory.countDocuments().exec();
                var subcategoryobj = new SubCategory();
                subcategoryobj.subCategory_name = formdata.subCategory_name
                subcategoryobj.categoryId = formdata.categoryId
                subcategoryobj.subcategoryId = total + 1
                // console.log("Total")
                if (req.file != undefined) {
                    var image = req.file
                    subcategoryobj.image = "images/subcategories/" + image.filename;
                }
                else {
                    subcategoryobj.image = "images/subcategories/default.jpg"
                }
                subcategoryobj.save()
                    .then(data => {
                        res.send({ success: true, message: "SubCategory added successfully", status: 200, data: data })
                    })
            } else {
                res.send({ success: false, message: "SubCategory Already Exist ", status: 409, data: [] })
            }
        })
}

/**
 * Get SubCategory
 */
exports.getSubcategory = function (req, res) {
    SubCategory.find().populate('categoryId')
        .then(data => {
            res.send({ success: true, message: "SubCategory loaded", status: 200, data: data })
        })
}
exports.getcustomerSubcategory = function (req, res) {
    SubCategory.find().exec()
        .then(data => {
            res.status(200).send({ success: true, message: "SubCategory loaded", status: 200, data: data })
        })
}

/**
 * Get SubCategory By Id
 */
exports.getcustomerSubcategorybyid = function (req, res) {
    // console.log(req.params)
    SubCategory.find({ categoryId: req.params.id })
        .then(data => {
            // console.log(data)
            res.send({ success: true, message: "SubCategory loaded", status: 200, data: data })
        })
}


/**
 * Get SubCategory By Id
 */
exports.getSubcategorybyid = function (req, res) {
    // console.log(req.params)
    SubCategory.findOne({ _id: req.params.id })
        .then(data => {
            // console.log(data)
            res.send({ success: true, message: "SubCategory loaded", status: 200, data: data })
        })
}

/**
 * Update SubCategory
 */
exports.updateSubcategory = function (req, res) {
    //  console.log(req.body)
    SubCategory.findOne({ _id: req.params.id })
        .then(async data => {
            if (data != null) {
                if (req.body.subCategory_name != undefined)
                    data.subCategory_name = req.body.subCategory_name
                if (req.body.categoryId != undefined)
                    data.categoryId = req.body.categoryId
                if (req.body.status != undefined)
                    data.status = req.body.status
                if (req.file != undefined) {
                    /**
                     * Unlink File Start
                     */
                    if (data.image != "images/subcategories/default.jpg") {
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
                    data.image = "images/subcategories/" + image.filename;
                }
                await data.save()
                res.send({ success: true, message: "SubCategory Updated", status: 200 })
            }
            else {
                res.send({ success: false, message: "No SubCategory Found", status: 404 })
            }
        })
}

/**
 * Delete SubCategory
 */
exports.deleteSubcategory = function (req, res) {
    SubCategory.findOne({ _id: req.params.id })
        .then(data => {
            if (data != null) {
                /**
                 * Unlink File Start
                 */
                if (data.image != "images/subcategories/default.jpg") {
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
                SubCategory.deleteOne({ _id: req.params.id })
                    .then(data => {
                        // console.log(data)
                    })
                    .catch(err => {
                        // console.log(err)
                    })
                res.send({ success: true, message: "SubCategory Deleted", status: 200 })
            }
            else {
                res.status(404).send({ success: false, message: "No SubCategory Found", status: 404 })
            }
        })
}
