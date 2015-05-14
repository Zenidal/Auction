function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


var getMaxPrice = function () {
    return 100;
};

var getMinPrice = function () {
    return getRandomInt(1, 100 - 1);
};

var getK = function () {
    return getRandomInt(1, 10);
};

var getM = function () {
    return getRandomInt(5, 20);
};

module.exports.getM = getM;
module.exports.getK = getK;
module.exports.getMinPrice = getMinPrice;
module.exports.getMaxPrice = getMaxPrice;
module.exports.getRandomInt = getRandomInt;

