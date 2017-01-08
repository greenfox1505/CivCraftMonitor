var listener = new require("./CivCraftPacketListener.js")(25580);

var express = require('express')
var app = express()

app.use(express.static('static'))
app.get('/api', function (req, res) {
  res.send(JSON.stringify(listener.data,null,2));
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


