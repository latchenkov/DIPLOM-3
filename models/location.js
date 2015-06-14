var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  location: {
    type: String,
    unique: true,
    required: true
  }
});


exports.Location = mongoose.model('Location', schema);
