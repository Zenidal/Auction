var config = require('./configuration');
var user = require('./user');

var game = {
    products: [],
    users: [],
    sessions: [],
    state: {
        isCreated: false,
        isBegin: false,
        isEnded: false,
    }
};

var getGameState = function () {
    return game.state;
};

var createGame = function () {
    game.users = user.getUsers();
    game.state.isCreated = true;

    game.users.forEach(function (element, key) {
        game.users[key].products = [];
    });

    for (var i = 0; i < 3; i++) {
        game.products.push({
            name: String.fromCharCode(97 + i),
            minPrice: config.getMinPrice,
            maxPrice: config.getMaxPrice,
            count: game.users.length / 2
        });
    };

    game.products.forEach(function (product) {
        for (var j = 0; j < Math.round(game.users.length / 2) + 1; j++) {
            game.sessions.push({
                id: config.getRandomInt(1, 10000000),
                product: { name: product.name, minPrice: config.getMinPrice(), price: config.getMaxPrice() },
                isEnded: false
            });
        }
    });

};

var getSession = function () {
    var result;
    game.sessions.forEach(function (element) {
        if (!element.isEnded) {
            result = element;
        }
    });
    return result;
};

var setCurrentState = function (id) {
    game.sessions.forEach(function (element, index) {
        if (element.id == id) {
            game.sessions[index].product.price -= config.getK();
            if (game.sessions[index].product.price <= element.product.minPrice) {
                game.sessions[index].product.price = element.minPrice;
                game.sessions[index].isEnded = true;
            }
        }
    });
};

var buyProduct = function (sessionId, userId) {
    var currentSessionIndex = -1;
    game.sessions.forEach(function (element, index) {
        if (element.id == sessionId) {
            currentSessionIndex = index;
        }
    });
    game.users.forEach(function (element, index) {
        if (element.id == userId) {
            if (currentSessionIndex != -1 && game.users[index].money >= game.sessions[currentSessionIndex].product.price && game.sessions[currentSessionIndex].isEnded == false) {
                game.sessions[currentSessionIndex].isEnded = true;
                game.users[index].money -= game.sessions[currentSessionIndex].product.price;
                game.users[index].products.push(game.sessions[currentSessionIndex].product);
            }
        }
    });
};

var stopGame = function () {
    game.state.isBegin = false;
};

var startGame = function () {
    game.state.isBegin = true;
};

var getStats = function () {
    game.users.forEach(function (element, index) {
        game.users[index].stats = game.users[index].products.length * 20 - (game.sessions.length - game.users[index].products.length) * 20;
    });
    console.log(game.users);
    return game.users;
};

module.exports.createGame = createGame;
module.exports.setCurrentState = setCurrentState;
module.exports.getGameState = getGameState;
module.exports.getSession = getSession;
module.exports.stopGame = stopGame;
module.exports.startGame = startGame;
module.exports.buyProduct = buyProduct;
module.exports.getStats = getStats;

