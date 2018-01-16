// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    selectAll: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        });
    },
    // The variables cols and vals are arrays.
    insertOne: function (cols, vals, callback) {
        orm.insertOne("burgers", cols, vals, function (res) {
            callback(res);
        });
    },
    updateOne: function (objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            callback(res);
        });
    }
};

// Export the database functions for the controller (burger_controller.js).
module.exports = burger;