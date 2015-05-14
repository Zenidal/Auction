
var express = require('express');
var app = express();
var user = require('./user');
var config = required('./configuration');


function setResHeader(req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
}

app.get('/*', setResHeader);

app.get('/Login', function (req, res) {
    if (req.query.name === undefined || req.query.role === undefined) {
        res.status(400).send('Error');
    } else {
        user.login(req.query.name, req.query.role);
        res.status(200).send();
    }
});

app.get('/GetUsers', function(req, res) {
    res.status(200).send(JSON.stringify(user.getUsers()));
});


app.get('/Location', function (req, res) {
    //geotargeting({
    //    latlng: req.query.latitude + ',' + req.query.longitude,
    //}, function (error, response, body) {
    //    if (!error && response.statusCode === 200) {
    //        res.send(body);
    //    }
    //    else {
    //        res.status(400).send('Error');
    //    }
    //});
});

app.listen(1337);