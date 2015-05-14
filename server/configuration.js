function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

var maxPrice = 100;
var minPrice = getRandomInt(1, maxPrice - 1);
var k = getRandomInt(1, 10);
var m = getRandomInt(5, 20);

var getMaxPrice = function () {
    return maxPrice;
};

var getMinPrice = function () {
    return minPrice;
};

var getK = function () {
    return k;
};

var getM = function () {
    return m;
};