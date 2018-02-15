/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
var port = process.env.PORT || 3000;
var server = require("http").createServer();
global.__base = __dirname + "/";
var init = require(global.__base + "utils/initialize");
//Initialize Express App for XSA UAA and HDBEXT Middleware
var app = init.initExpress();
//Setup Routes
var router = require("./router")(app, server);
//Initialize the XSJS Compatibility Layer
init.initXSJS(app);
//Start the Server
server.on("request", app);
server.listen(port, function() {
	console.info("HTTP Server: " + server.address().port);
});
/*var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port  = process.env.PORT || 3000;

var options = {
	//anonymous : true, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

//Add SQLCC
try{
	options.hana.sqlcc = xsenv.getServices({
		'my.sqlcc_config':'CROSS_SCHEMA_SFLIGHT'
	});
	

	
}catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);
console.log("Server listening on port %d", port);
*/