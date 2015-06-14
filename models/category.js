var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  cat_id: {
    type: Number,
    unique: true,
    required: true
  },
  category: {
    type: String,
    unique: true,
    required: true
  },
  parent_id: {
    type: String,
    default: null
  }  
});

exports.Category = mongoose.model('Category', schema);