const express = require("express");
const request = require("request");
const rp = require("request-promise");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const extractor = require("./lib/extractor");
const airDataModel = require("./models/airData");
const app = express();
const Chart = require("chart.js");

let un = `nrHay`;
let pw = `m1Database!`;
mongoose.connect(
  `mongodb+srv://${un}:${pw}@cluster0-qdloe.gcp.mongodb.net/test?retryWrites=true&w=majority`
);

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.get("/api/data", (req, res) => {
  airDataModel
    .find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(`Err ${err}`);
      return;
    });
});

function getAQIdata(jsons) {
  result = [];
  for (var i = 0; i < jsons.length; i++) {
    result.push(jsons[i].aq.aqi);
  }
  return result;
}

function getAQItimestamps(jsons) {
  result = [];
  for (var i = 0; i < jsons.length; i++) {
    result.push(jsons[i].ts.getTime());
  }
  return result;
}

app.get("/", (req, res) => {
  airDataModel
    .find({})
    .then(data => {
      const returnData = {
        title: "AQI Index",
        data: data,
        AQIdata: getAQIdata(data),
        AQIdates: getAQItimestamps(data)
      };
      res.render("layout", returnData);
    })
    .catch(err => {
      console.log(`Err ${err}`);
      return;
    });
});

app.listen(3000, () => console.log("App started on port 3000"));
