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
    building: {
      type: String,
    },
    stateDistrict: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    postCode: {
      type: String,
    },
    address: {
      type: String,
    }
  },
  { toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('address', schema);

