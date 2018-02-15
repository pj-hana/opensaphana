/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, newcap:0*/
"use strict";

var express = require("express");

module.exports = function() {
	var app = express.Router();
	var async = require("async");

	app.get("/", function(req, res) {
		res.send("Hello from Node.js");
	});

	app.get("/example1", function(req, res) {
		var client = req.db;
		client.prepare(
			"select SESSION_USER from \"DUMMY\" ",
			function(err, statement) {
				if (err) {
					res.type("text/plain").status(500).send("ERROR: " +
						err.toString());
					return;
				}
				statement.exec([],
					function(err, results) {
						if (err) {
							res.type("text/plain").status(500).send("ERROR: " +
								err.toString());
							return;
						} else {
							var result = JSON.stringify({
								Objects: results
							});
							res.type("application/json").status(200).send(result);
						}
					});
			});
	});
	app.get("/example2", function(req, res) {
		var client = req.db;
		async.waterfall([
			function prepare(callback) {
				client.prepare(
					"select SESSION_USER from \"DUMMY\" ",
					function(err, statement) {
						callback(null, err, statement);
					});
			},
			function execute(err, statement, callback) {
				statement.exec([], function(execErr, results) {
					callback(null, execErr, results);
				});
			},
			function response(err, results, callback) {
				if (err) {
					res.type("text/plain").status(500).send("ERROR: " +
						err.toString());
					return;
				} else {
					var result =
						JSON.stringify({
							Objects: results
						});
					res.type("application/json").status(200).send(result);
				}
				callback();
			}
		]);
	});

	return app;
};