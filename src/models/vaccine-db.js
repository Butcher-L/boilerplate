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
    vaccineType: {
      type: String,
    },
    firstDoseDate: {
      type: Date,
    },
    secondDoseDate: {
      type: Date,
    },
    thirdDoseDate: {
      type: Date,
    },
    vaccineSite: {
      type: String,
    },
    vaccinationStatus: {
      type: String,
    },
    boosterVaccine: {
      type: String,
    },
    boosterStatus: {
      type: String,
    }, 
  },
  { toJSON, _id: false },
);

schema.index({ user: 1 });


module.exports = Mongoose.model('vaccine', schema);

