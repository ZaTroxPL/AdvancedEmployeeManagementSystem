const express = require('express'); 
const databaseInteractions = require('./database-interactions');

const app = express();
app.use(express.json());
app.listen(3000, () => {})

app.post('/authentication', function (req, res) {
    console.log("\nBody:\n" + req.body.id);
    var result = databaseInteractions.GetProfileData(req.body.id);
    console.log("about to send response");
    res.send(JSON.stringify({status: "ok"}));
})

app.get('/', function (req, res) {
    res.send("response");
    console.log("success");
})