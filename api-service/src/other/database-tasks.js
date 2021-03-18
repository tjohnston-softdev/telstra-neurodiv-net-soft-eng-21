// MongoDB wrapper functions.


// Insert new document.
function insertCollectionDocument(dbObject, docObject, collName, insertCallback)
{
	dbObject.collection(collName).insertOne(docObject, function (insertErr)
	{
		if (insertErr !== null)
		{
			return insertCallback(insertErr, null);
		}
		else
		{
			return insertCallback(null, true);
		}
	});
}


// Retrieve most recent documents.
function retrieveCollectionDocuments(dbObject, collName, readCallback)
{
	var sortOrder = {"_timestamp": -1};
	
	dbObject.collection(collName).find().sort(sortOrder).limit(100).toArray(
	function (readErr, readRes)
	{
		if (readErr !== null)
		{
			return readCallback(readErr, null);
		}
		else
		{
			return readCallback(null, readRes);
		}
	});
}


// Clear all documents.
function clearCollectionDocuments(dbObject, collName, clearCallback)
{
	var queryAll = {};
	
	dbObject.collection(collName).deleteMany(queryAll, function (clearErr)
	{
		if (clearErr !== null)
		{
			return clearCallback(clearErr, null);
		}
		else
		{
			return clearCallback(null, true);
		}
	});
}



module.exports =
{
	insertDocument: insertCollectionDocument,
	retrieveDocuments: retrieveCollectionDocuments,
	clearDocuments: clearCollectionDocuments
};