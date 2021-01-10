var express = require('express');
var app = express();

app.listen(3000, () => {})

app.post('/', function (req, res) {
    console.log(req);
    res.send("ok");
    //var body = JSON.parse(req.body);
    //console.log(body.id);
})

app.get('/', function (req, res) {
    res.send("response");
    console.log("success");
})