const  { Schema } = require('mongoose');
const Mongoose = require('mongoose');

const  mongooseUtil = require('../../middlewares/mongo/mongoose')

const { toJSON } = mongooseUtil;

const schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  { toJSON, _id: false },
);

schema.index({ _id: 1 });
schema.index({ firstname: 1, lastname: 1 });


module.exports = Mongoose.model('user', schema);

