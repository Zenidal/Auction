var users = [];

var login = function (userName, userRole) {
    users.push({
        id: users.length,
        name: userName,
        role: userRole,
        money: 100
    });
};

var cleanUserList = function () {
    users = [];
};

var isValidUser = function (name, role) {
    if (name === undefined || role === undefined || (role === 'admin' && getAdmin() !== undefined)) {
        return false;
    }
    return true;
};

var getAdmin = function () {
    var result = undefined;
    users.forEach(function (element) {
        if (element.role === 'admin') {
            result = element;
        }
    });
    return result;
};

var getUserByNameAndRole = function (userName, userRole) {
    var result = undefined;
    users.forEach(function (element) {
        if (element.name === userName && element.role === userRole) {
            result = element;
        }
    });
    return result;
};

var getUserById = function (id) {
    var result = undefined;
    users.forEach(function (element) {
        if (element.id == id) {
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
module.exports.getUserByNameAndRole = getUserByNameAndRole;
module.exports.getUsers = getUsers;
module.exports.isValidUser = isValidUser;
module.exports.getUserById = getUserById;