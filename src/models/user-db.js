const  { Schema } = require('mongoose');
const Mongoose = require('mongoose');

const  mongooseUtil = require('../middlewares/mongo/mongoose')

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
    middlename: {
      type: String,
    },
    suffix: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    fullname:{
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    geolocation: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    teams: {
      type: [String],
    },
    jobRole: {
      type: String,
      required: true,
    },
    deployment: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    vaccine: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
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
    userPolicy: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
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

schema.index({ firstname: 1, lastname: 1 });


module.exports = Mongoose.model('user', schema);

