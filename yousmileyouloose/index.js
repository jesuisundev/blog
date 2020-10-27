const express = require("express")
const https = require('https');
const path = require("path")
const fs = require('fs');
const app = express()

app.use(express.static(path.join(__dirname, "public")));

https.createServer({
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem'),
        passphrase: ''
    }, app)
    .listen(8080);

//app.listen(8080, () => console.log('Server on port 8080'))