const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = maxLength => {return ({
  type: String,
  required: true,
  maxlength: maxLength
})};

const portfolioSchema = new Schema({
  userId: setStringType(255),
  title: setStringType(127),
  company: setStringType(127),
  location: setStringType(127),
  position: setStringType(127),
  description: setStringType(2047),
  startDate: { type: Date, required: true },
  endDate: { type: Date }
})


module.exports = mongoose.model('Portfolio', portfolioSchema);