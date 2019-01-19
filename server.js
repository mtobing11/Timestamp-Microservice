// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/:time", function (req, res) {
  var dateVal = req.params.time;
  
  if(isNaN(dateVal)){
    var utcDate = new Date(dateVal).toUTCString();
    var unixDate = Math.round(new Date(dateVal).getTime()/1000);
  } else {
    var unixDate = dateVal;
    var utcDate = new Date(dateVal*1000).toUTCString();
  } 
  res.json({"unix":unixDate,"utc":utcDate})
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});