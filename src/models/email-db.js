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
    email: {
      type: String,
      required: true,
    },
    qnxEmail: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: [String],
    },
    
  },
  { toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('email', schema);

