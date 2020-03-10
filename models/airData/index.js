/**
 * @fileOverview Schema and Model for DB JSON objects
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * Schema model used as template for JSON objects in DB
 */
let airDataSchema = new Schema({
  /**
   * Air Quality Figures - Floating Point numbers
   */
  aq: {
    /**
     * Air Quality Index
     *
     * VERY GOOD - 0 - 33
     *
     * GOOD - 34 - 66
     *
     * FAIR - 67 - 99
     *
     * POOR - 100 - 149
     *
     * VERY POOR - 150 - 199
     *
     * HAZARDOUS - 200
     */
    aqi: Number,
    /**
     * Carbon Monoxide (Parts per million)
     */
    co: Number,
    /**
     * Humidity
     */
    h: Number,
    /**
     * Nitrogen Dioxide
     */
    no2: Number,
    /**
     * Ozone
     */
    o3: Number,
    /**
     * Pressure
     */
    p: Number,
    /**
     * Respirable Particulate Matter
     */
    pm10: Number,
    /**
     * Fine Particulate Matter
     */
    pm25: Number,
    /**
     * Sulfur Dioxide
     */
    so2: Number,
    /**
     * Temperature
     */
    t: Number,
    /**
     * Wind
     */
    w: Number
  },
  /**
   * UTC Timestamp of when data was collected
   */
  ts: Date,
  /**
   * City data was collected from
   */
  city: String
});

/**
 * Mongoose DB model created from Schema
 */
let airDataModel = mongoose.model(`airDataModel`, airDataSchema);
module.exports = airDataModel;
