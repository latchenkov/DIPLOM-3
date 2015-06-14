var mongoose = require('lib/mongoose'),
Schema = mongoose.Schema;
var async = require('async');

mongoose.Error.messages.general.required = "Поле обязательно для заполнения";
mongoose.Error.messages.String.maxlength  = "Это поле вмещает не более {MAXLENGTH} символов";

var schema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 40
  },
  price: {
    type: String,
    required: true,
    match: [/^\d+(\.\d{0,2})?$/,
            "Цена должна быть числом типа 123.45"]
  },
  seller_name: {
    type: String,
    required: true,
    maxlength: 40
  },
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,13}$/,
            "Проверьте правильность E-mail адреса."],
    maxlength: 40
  },
  allow_mails: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    required: true,
    maxlength: 20
  },
  location_id: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Присвоение новых значений элементам модели
schema.methods.setAttributes = function(attributes) {
    var upd_ad = this;
    Object.getOwnPropertyNames(attributes).forEach(function(name) { 
                    upd_ad[name] = attributes[name];
                });
    return upd_ad;            
};

// Сохранение или обновление модели в БД по ID
schema.statics.SaveOrUpdateById = function(data, id, callback) {
    var Ad = this;
    
    async.waterfall([
        function (callback){
            Ad.findById(id, callback);
        },
        function (ad, callback){
            if(ad){// update
                ad.setAttributes(data);
            }
            else{// new Ad save
                var ad = new Ad(data);
            }    
            ad.save(function(err, new_ad){
                if(err) return callback(err);
                    callback(null, new_ad);
            });
        }
    ], callback);
};

exports.Ad = mongoose.model('Ad', schema);