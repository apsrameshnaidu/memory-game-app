const express = require('express')
const app = express()
const db = require('./queries')
const port = 8000

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Memory game backend' })
})

app.get('/cards', db.getAllCards);
app.get('/cards/:level', db.getCardsByLevel);

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}.`)
})
