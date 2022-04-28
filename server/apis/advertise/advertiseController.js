const fs = require('fs');
const db = require('../../config/db')
var Advertise = require('../advertise/advertiseModel');


/**
 * Add
 */
exports.add = function (req, res) {
  var formdata = req.body
  var advertise = new Advertise();
  advertise.title = formdata.title
  if (req.file != undefined) {
    var image = req.file
    advertise.image = "images/advertises/" + image.filename;
  }
  else {
    advertise.image = "images/advertises/default.jpg"
  }
  advertise.save()
    .then(data => {
      res.send({ success: true, message: "Advertise added successfully", status: 200, data: data })
    })
}

/**
* Get all
*/
exports.index = function (req, res) {
  Advertise.find().exec()
    .then(data => {
      res.send({ success: true, message: "Advertise loaded", status: 200, data: data })
    })
}
exports.customerindex = function (req, res) {
  Advertise.find().exec()
    .then(data => {
      res.status(200).send({ success: true, message: "Advertise loaded", status: 200, data: data })
    })
}

/**
* Delete
*/
exports.delete = function (req, res) {
  Advertise.findOne({ _id: req.params.id })
    .then(data => {
      if (data != null) {
        Advertise.deleteOne({ _id: req.params.id })
          .then(data => {
            // console.log(data)
          })
          .catch(err => {
            // console.log(err)
          })
        res.send({ success: true, message: "Advertise Deleted", status: 200 })
      }
      else {
        res.send({ success: false, message: "Advertise not Found", status: 404 })
      }
    })
}
