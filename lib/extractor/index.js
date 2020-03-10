/**
 * @fileOverview DB Extractor
 */

const reqLib = require("request");
const rp = require("request-promise");
const airDataModel = require("../../models/airData");

let airData = {};
airData.aq = {};
/**
 * Requests data from AQI source and formats it into a JSON object. This JSON object is then saved to the database.
 */
function requestData() {
  rp("http://api.waqi.info/feed/sydney/?token=demo")
    .then(function(data) {
      data = JSON.parse(data);
      airData.ts = Date.now();
      airData.city = data.data.city.name;
      airData.aq.aqi = data.data.aqi;
      airData.aq.co = data.data.iaqi.co.v;
      airData.aq.h = data.data.iaqi.h.v;
      airData.aq.no2 = data.data.iaqi.no2.v;
      airData.aq.o3 = data.data.iaqi.o3.v;
      airData.aq.p = data.data.iaqi.p.v;
      airData.aq.pm10 = data.data.iaqi.pm10.v;
      airData.aq.pm25 = data.data.iaqi.pm25.v;
      airData.aq.so2 = data.data.iaqi.so2.v;
      airData.aq.t = data.data.iaqi.t.v;
      airData.aq.w = data.data.iaqi.w.v;
      let myData = new airDataModel(airData);
      myData
        .save()
        .then(mdata => {
          return;
        })
        .catch(err => {
          console.log(`Err ${err}`);
          return;
        });
    })
    .catch(err => {
      console.log(`Err ${err}`);
      return;
    });
}
/**
 * Boolean - after new data is collected that day, do not collect any more data for 24 hrs
 */
let getData = true;
let timeToWait = 60 * 1000 * 60 * 24;
while (getData) {
  setTimeout(requestData, timeToWait);
  getData = false;
}
