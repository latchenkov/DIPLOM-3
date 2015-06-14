var mongoose = require('lib/mongoose');
var async = require('async');
var data = require('data');
var log = require ('lib/log')(module);
 
    log.info('Process starting...');

async.series([
    open,
    dropDatabase,
    requireModels,
    createAds,
    createCategories,
    createLocations
], function(err) {
    if (err){
       log.error('Process failed'); 
    }
    else{
        log.info('Locations created...');
        log.info('Database created successfully');
    }
    mongoose.disconnect();
    log.info('Process done');
    process.exit(err ? 255 : 0);
});


function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    log.info('Connection opened...');
        var db = mongoose.connection.db;
        db.dropDatabase(callback);
}

function requireModels(callback) {
    log.info('Database  droped...');
        require('models/ad');
        require('models/category');
        require('models/location');

  async.each(Object.keys(mongoose.models), function(modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createAds(callback) {
    log.info('Models required...');

    var ads = data.get('ad');
    
    async.each(ads, function(adData, callback) {
        var ad = new mongoose.models.Ad(adData);
        ad.save(callback);
    }, callback);
}

function createCategories(callback) {
    log.info('Ads created...');

    var categories = data.get('category');
    
    async.each(categories, function(categoryData, callback) {
        var category = new mongoose.models.Category(categoryData);
        category.save(callback);
    }, callback);
}

function createLocations(callback) {
    log.info('Categories created...');

    var locations = data.get('location');
    
    async.each(locations, function(locationData, callback) {
        var location = new mongoose.models.Location(locationData);
        location.save(callback);
    }, callback);
}