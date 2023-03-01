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
    pin: {
      type: String,
    },
    gmapAddressLink: {
      type: String,
    },
  },
{ toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('geolocation', schema);

