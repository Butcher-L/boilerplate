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
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    dateTimeCreated: {
      type: Date,
      required: true,
    },
    dateTimeUpdated: {
      type: Date,
      required: true,
    },

  },
  { toJSON, _id: false },
);

schema.index({ _id: 1 });
schema.index({ name: 1, user: 1 });


module.exports = Mongoose.model('transaction', schema);

