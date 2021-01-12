const express = require('express');
const databaseInteractions = require('./database-interactions');

const app = express();
app.use(express.json());
app.listen(3000, () => { })

app.post('/authentication', async function (req, res, next) {
    try {
        console.log("\nBody: " + req.body.id);
        var result = await databaseInteractions.GetProfileData(req.body.id);
        console.log("about to send response");
        res.send(JSON.stringify({ userData: result }));
    } catch (error) {
        next(error);
    }
})

app.get('/', function (req, res) {
    res.send("response");
    console.log("success");
})