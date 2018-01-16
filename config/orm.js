// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(object) {
    var array = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in object) {
        var value = object[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(object, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            array.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return array.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function (table, callback) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    insertOne: function (table, cols, val, callback) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") VALUES (?) ";

        console.log(queryString);

        connection.query(queryString, val, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },
    // An example of objColVals would be {burger_name: Big Mac}
    updateOne: function (table, objColVal, condition, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVal);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;