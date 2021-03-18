const fs = require("fs");

// Read config JSON file.
function getConfigSettings(conFileName)
{
	var fileConts = fs.readFileSync(conFileName, "utf8");
	var jsonParse = JSON.parse(fileConts);
	return jsonParse;
}



// Write connection URL based on config properties.
function writeDatabaseURLString(dbPort, dbName)
{
	var writeRes = ["mongodb://localhost:", dbPort, "/", dbName].join("");
	return writeRes;
}


module.exports =
{
	getSettings: getConfigSettings,
	writeDatabaseURL: writeDatabaseURLString
};