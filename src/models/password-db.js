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
    password: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    lastChangePassword: {
      type: String,
      default: null,
    },
    lastChangePasswordDate: {
      type: Date,
      default: null,
    }

  },
  { toJSON, _id: false },
);


schema.index({ user: 1 });


module.exports = Mongoose.model('password', schema);

