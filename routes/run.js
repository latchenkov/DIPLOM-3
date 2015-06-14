var express = require('express');
var router = express.Router();
var mongoose = require('lib/mongoose');
var Location = require('models/location').Location;
var Category = require('models/category').Category;
var Ad = require('models/ad').Ad;


/* GET location-list */
router.get('/location-list', function(req, res, next) {
  Location.find({}, function(err, locations) {
      if (err) return next(err);
      res.json(locations);
    });
});

/* GET location-list */
router.get('/category-list', function(req, res, next) {
  Category.find({}, function(err, categories) {
      if (err) return next(err);
      res.json(categories);
    });
});

/* GET all-ads */
router.get('/all-ads', function(req, res, next) {
  Ad.find({}, function(err, ads) {
      if (err) return next(err);
      var result = {};
      if (!ads.length){
                    result.status='warning';
                    result.message = "Внимание! В базе данных нет объявлений.";
                }
                else {
                    result.status = 'success';
                    result.data = ads;
                }
      res.json(result);
    });
});
module.exports = router;
