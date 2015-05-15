
var express = require('express');
var app = express();
var user = require('./user');
var config = require('./configuration');
var game = require('./game');

function setResHeader(req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
}

app.get('/*', setResHeader);

app.get('/Login', function (req, res) {
    if (!user.isValidUser(req.query.name, req.query.role)) {
        res.status(400).send('Error');
    } else {
        if (user.getUserByNameAndRole(req.query.name, req.query.role) === undefined) {
            user.login(req.query.name, req.query.role);
        };
        res.status(200).send(JSON.stringify(user.getUserByNameAndRole(req.query.name, req.query.role).id));
    }
});

app.get('/GetUsers', function (req, res) {
    res.status(200).send(JSON.stringify(user.getUsers()));
});

app.get('/GetGameState', function (req, res) {
    res.status(200).send(JSON.stringify(game.getGameState()));
});

app.get('/GetUser', function (req, res) {
    res.status(200).send(JSON.stringify(user.getUserById(req.query.id)));
});

app.get('/CreateGame', function (req, res) {
    game.createGame();
    res.status(200).send();
});

app.get('/GetSession', function (req, res) {
    res.status(200).send(JSON.stringify(game.getSession()));
});

app.get('/GetStats', function (req, res) {
    res.status(200).send(JSON.stringify(game.getStats()));
});

app.get('/GetM', function (req, res) {
    res.status(200).send(JSON.stringify({ data: config.getM() }));
});

app.get('/SetCurrentState', function (req, res) {
    game.setCurrentState(req.query.id);
    res.status(200).send();
});

app.get('/StopGame', function (req, res) {
    game.stopGame();
    res.status(200).send();
});

app.get('/StartGame', function (req, res) {
    game.startGame();
    res.status(200).send();
});

app.get('/BuyProduct', function (req, res) {
    game.buyProduct(req.query.sessionId, req.query.userId);
    res.status(200).send();
});

app.get('/BuyWiski', function (req, res) {
    game.buyWiski(req.query.sessionId, req.query.userId);
    res.status(200).send();
});

app.listen(1337);