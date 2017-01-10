#!/usr/bin/env node
var listener = new require("./listener.js")(25580);

var express = require('express')
var app = express()

app.use(express.static('static'))
app.get('/apiPre', function (req, res) {
	console.log("serving /apiPre", Date.now());
	var msg = "<html><head></head><body><pre>" + (JSON.stringify(listener.sorted(),null,2)) + "</pre></body></html>"
	res.send(msg);
})

app.get('/api', function (req, res) {
  var msg = JSON.stringify(listener.sorted())
  res.send(msg);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


