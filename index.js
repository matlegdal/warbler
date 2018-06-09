const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
// const debug = require('debug')

const errorHandler = require("./handlers/error");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res, next){
    res.send("Hello world");
});

app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, function(){
    // debug('Listening on ' + port)
    console.log("Listening on " + port);
});
