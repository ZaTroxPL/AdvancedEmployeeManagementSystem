const express = require('express');
const databaseInteractions = require('./database-interactions');

const app = express();
app.use(express.json());
app.listen(3000, () => { })

app.post('/api/users/create', async function (req, res, next) {
    try {
        console.log("creating new user")
        var result = await databaseInteractions.CreateProfile(req.body)
    } catch (error) {
        next(error)
    }
})

app.get('/api/users/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);
        var result = await databaseInteractions.GetProfileData(id);
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