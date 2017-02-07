#!/usr/bin/env node
var listener = new require("./listener.js")(25580);

var express = require('express')
var app = express()

var static = express.static(__dirname + '/static')


app.use("/netizen539/Servers" , static );
app.use(static)

app.get('/apiPre', function (req, res) {
	console.log("serving /apiPre", Date.now());
	var msg = "<html><head></head><body><pre>" + (JSON.stringify(listener.sorted(),null,2)) + "</pre></body></html>"
	res.send(msg);
})
app.get('/api.js', function (req, res) {
	console.log("serving /apiPad", Date.now());
	var msg = req.param("callback") + "(" + JSON.stringify(listener.sorted()) + ");"
	res.send(msg);
})

app.get('/api', function (req, res) {
	console.log("serving /api", Date.now());
	var msg = JSON.stringify(listener.sorted())
	res.send(msg);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


