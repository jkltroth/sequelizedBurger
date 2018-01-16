// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // Create all our routes and set up logic within those routes where required.
    app.get("/", function (req, res) {
        db.Burger.findAll({})
            .then(function (data) {
                var handlebarsObject = {
                    burgers: data
                };
                console.log(handlebarsObject);
                res.render("index", handlebarsObject);
            });
    });

    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
                burger_name: req.body.name
            }).then(function (result) {
                // Send back the ID of the new burger
                res.json({
                    id: result.insertId
                });
            })
            .catch(function (err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
            });
    });

    app.put("/api/burgers/:id", function (req, res) {
        var condition = "id = " + req.params.id;

        console.log("condition", condition);

        db.Burger.update({
                devoured: req.body.devoured
            }, {
                where: {
                    id: condition
                }
            }).then(function (result) {
                if (result.changedRows == 0) {
                    // If no rows were changed, then the ID must not exist, so 404
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                }
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};