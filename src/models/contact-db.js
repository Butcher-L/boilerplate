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
    mobile: {
      type: String,
      required: true,
    },
    viber: {
      type: String,
    },
    emergencyContactPerson: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    
  },
  { toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('contact', schema);

