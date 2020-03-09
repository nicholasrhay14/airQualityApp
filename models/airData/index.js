const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var airDataSchema = new Schema({
  aq: {
    aqi: Number,
    co: Number,
    h: Number,
    no2: Number,
    o3: Number,
    p: Number,
    pm10: Number,
    pm25: Number,
    so2: Number,
    t: Number,
    w: Number
  },
  ts: Date,
  city: String
});

let airDataModel = mongoose.model(`airDataModel`, airDataSchema);
module.exports = airDataModel;
