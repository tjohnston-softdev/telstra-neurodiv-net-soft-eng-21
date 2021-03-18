// Incoming endpoint.

const incBody = require("./other/inc-body");
const randomID = require("./other/random-id");
const databaseTasks = require("./other/database-tasks");
const selectLargestNumber = require("./methods/select-largest-number");
const findDuplicateCharacters = require("./methods/find-duplicate-characters");
const removeWhitespace = require("./methods/remove-whitespace");


// Main function.
function processIncomingRequest(databaseObject, requestBodyData, requestCallback)
{
	var incomingObject = {};
	var outgoingObject = {};
	var inputValid = false;
	
	// Validates input object.
	incomingObject = incBody.validateBody(requestBodyData);
	inputValid = incomingObject["_valid"];
	
	// Assigns random - almost certainly unique - integer.
	incomingObject["_id"] = randomID.generateInteger();
	
	
	// Inserts incoming object into database.
	databaseTasks.insertDocument(databaseObject, incomingObject, "incoming", function (incomingInsertError)
	{
		if (incomingInsertError !== null)
		{
			// Insert error.
			return requestCallback(incomingInsertError, null);
		}
		else if (inputValid === true)
		{
			// Initialize outgoing.
			outgoingObject["_id"] = randomID.generateHex();
			outgoingObject["_timestamp"] = Date.now();
			
			// Perform methods.
			outgoingObject["largestNumber"] = selectLargestNumber.perform(incomingObject.numbersMeetNumbers);
			outgoingObject["duplicateCharacters"] = findDuplicateCharacters.perform(incomingObject.findDuplicates);
			outgoingObject["noWhitespace"] = removeWhitespace.perform(incomingObject.whiteSpacesGalore);
			
			callOutgoingInsert(databaseObject, outgoingObject, requestCallback);
		}
		else
		{
			callInputError(incomingObject, requestCallback);
		}
	});
}


// Insert outgoing.
function callOutgoingInsert(databaseObj, outgoingObj, outputCallback)
{
	databaseTasks.insertDocument(databaseObj, outgoingObj, "outgoing", function (outgoingInsertError)
	{
		if (outgoingInsertError !== null)
		{
			// Insert error
			return outputCallback(outgoingInsertError, null);
		}
		else
		{
			// Request successful - Send outgoing object.
			return outputCallback(null, outgoingObj);
		}
	});
}


// Sends input error.
function callInputError(incomingData, errorCallback)
{
	var flaggedMessage = incomingData["_errorMessage"];
	return errorCallback(new Error(flaggedMessage), null);
}



module.exports =
{
	processRequest: processIncomingRequest
};