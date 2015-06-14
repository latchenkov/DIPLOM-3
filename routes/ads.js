var express = require('express');
var router = express.Router();
var mongoose = require('lib/mongoose');
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var Ad = require('models/ad').Ad;

/* Delete ad from db */
router.get('/delete/:id', function(req, res, next) {
    try {
        var id = new ObjectID(req.params.id);
    } 
    catch (e) {
        return next(404);
    }

    mongoose.models.Ad.findByIdAndRemove(id, function(err, ad) { 
        var result = {};
        if (err){ return next(err);}
            if (!ad){ return next(404);}
                result.status = 'success';
                result.message = "Объявление " + '"' + ad.title + '"' +  " удалено из базы данных";
            res.json(result);
        });
});
    
/* SAVE or UPDATE Ads from DB */
router.post('/save', function(req, res, next) {
    var data = req.body;
    var id = data._id;
   
    mongoose.models.Ad.SaveOrUpdateById(data, id, function(err, ad){
            if (err && err.name === "ValidationError") {
                res.status(422);
                return res.json(err.errors);
            }
            else if (err){
                return next(err);
            }
            else{
                var result = {};
                result.status='success';
                result.message = "Объявление " + '"' + ad.title+ '"' +  " сохранено в базе данных";
                result.data = ad;
                res.json(result);
            }    
    }); 
});

module.exports = router;
