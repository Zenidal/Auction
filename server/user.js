var users = [];

var login = function (userName, userRole) {
    users.push({
        name: userName,
        role: userRole
    });
};

var cleanUserList = function () {
    users = [];
};

var getUserByName = function (userName) {
    var result;
    users.forEach(function (element) {
        if (element.name === userName) {
            result = element;
        }
    });
    return result;
};

var getUsers = function () {
    var result = [];
    users.forEach(function (element) {
        if (element.role !== 'admin') {
            result.push(element);
        }
    });
    return result;
};

module.exports.login = login;
module.exports.cleanUserList = cleanUserList;
module.exports.getUserByName = getUserByName;
module.exports.getUsers = getUsers;