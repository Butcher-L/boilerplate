const  { Schema } = require('mongoose');
const Mongoose = require('mongoose');

const mongooseUtil = require('../middlewares/mongo/mongoose')

const { toJSON } = mongooseUtil;

const schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    contractExpirationDate: {
      type: Date,
      required: true,
    },
    regularizationDate: {
      type: Date,
    },
    
  },
  { toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('contract', schema);

