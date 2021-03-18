// Database endpoint functions.

const databaseTasks = require("./other/database-tasks");


// Clear collection.
function processClearRequest(databaseObject, databaseCollectionName, requestCallback)
{
	databaseTasks.clearDocuments(databaseObject, databaseCollectionName, requestCallback);
}


// Retrieve most recent collection entries.
function processReadRequest(databaseObject, databaseCollectionName, requestCallback)
{
	databaseTasks.retrieveDocuments(databaseObject, databaseCollectionName, requestCallback);
}



module.exports =
{
	processClear: processClearRequest,
	processRead: processReadRequest
};