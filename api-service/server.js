/*
	Telstra Neurodiversity Program 2021
	Network Software Engineer (Backend)
	API service main file
*/

const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const readConfigFile = require("./src/read-config-file");
const epIncoming = require("./src/ep-incoming");
const epDatabase = require("./src/ep-database");
const serverApp = express();
const apiSettings = readConfigFile.getSettings("config.json");
const mongoURL = readConfigFile.writeDatabaseURL(apiSettings.mongoPort, apiSettings.mongoDbName);
const mongoOpts = {useNewUrlParser: true, useUnifiedTopology: true};

var mongoDatabase = null;

console.log("Initializing");

// Support JSON body.
serverApp.use(bodyParser.urlencoded({extended: true}));
serverApp.use(bodyParser.json());


// Root
serverApp.get("/", function (req, res)
{
	res.send("Hello World - Send a POST request to '/incoming'");
});



// POST incoming JSON object.
serverApp.post("/incoming", function (req, res)
{
	epIncoming.processRequest(mongoDatabase, req.body, function (incomingErr, incomingRes)
	{
		if (incomingErr !== null)
		{
			res.status(500).send(incomingErr.message);
		}
		else
		{
			res.status(200).send(incomingRes);
		}
	});
});




// GET saved 'incoming' records.
serverApp.get("/incoming", function (req, res)
{
	epDatabase.processRead(mongoDatabase, "incoming", function (readIncomingErr, readIncomingRes)
	{
		if (readIncomingErr !== null)
		{
			res.status(500).send(readIncomingErr.message);
		}
		else
		{
			res.status(200).send(readIncomingRes);
		}
	});
});



// GET saved 'outgoing' records.
serverApp.get("/outgoing", function (req, res)
{
	epDatabase.processRead(mongoDatabase, "outgoing", function (readOutgoingErr, readOutgoingRes)
	{
		if (readOutgoingErr !== null)
		{
			res.status(500).send(readOutgoingErr.message);
		}
		else
		{
			res.status(200).send(readOutgoingRes);
		}
	});
});



// DELETE saved 'incoming' records.
serverApp.delete("/incoming", function (req, res)
{
	epDatabase.processClear(mongoDatabase, "incoming", function (deleteIncomingErr)
	{
		if (deleteIncomingErr !== null)
		{
			res.status(500).send(deleteIncomingErr.message);
		}
		else
		{
			res.status(200).send("All incoming records deleted");
		}
	});
});


// DELETE saved 'outgoing' records.
serverApp.delete("/outgoing", function (req, res)
{
	epDatabase.processClear(mongoDatabase, "outgoing", function (deleteOutgoingErr)
	{
		if (deleteIncomingErr !== null)
		{
			res.status(500).send(deleteOutgoingErr.message);
		}
		else
		{
			res.status(200).send("All outgoing records deleted");
		}
	});
});



// Connect to MongoDB
console.log("Establishing Database connection");
mongoClient.connect(mongoURL, mongoOpts, function (intlErr, intlRes)
{
	if (intlErr !== null)
	{
		throw intlErr;
	}
	else
	{
		mongoDatabase = intlRes.db(apiSettings.mongoDbName);
		console.log("Database running on port " + apiSettings.mongoPort);
		
		
		// API listens on saved port.
		serverApp.listen(apiSettings.restPort, function()
		{
			console.log("API running on port " + apiSettings.restPort);
		});
	}
});