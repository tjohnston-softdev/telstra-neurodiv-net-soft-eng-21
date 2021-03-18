// Validates incoming input object.


// Unit testing only.
function testIncomingRequestBody(testInput)
{
	var resultObject = validateIncomingRequestBody(testInput);
	var testPassed = resultObject["_valid"];
	var flaggedMessage = resultObject["_errorMessage"];
	
	if (testPassed !== true)
	{
		throw new Error(flaggedMessage);
	}
	
	return testPassed;
}

// Main function.
function validateIncomingRequestBody(bodyObject)
{
	var validationResult = initializeResultObject();
	var objectValid = checkBaseObject(bodyObject, validationResult);
	var duplicateStringValid = false;
	var whiteStringValid = false;
	var booleanValid = false;
	var numberArrayValid = false;
	
	if (objectValid === true)
	{
		duplicateStringValid = checkStringProperty(bodyObject, "findDuplicates", validationResult);
	}
	
	if (duplicateStringValid === true)
	{
		whiteStringValid = checkStringProperty(bodyObject, "whiteSpacesGalore", validationResult);
	}
	
	if (whiteStringValid === true)
	{
		booleanValid = checkBooleanProperty(bodyObject, "validateMeOnlyIActuallyShouldBeABoolean", validationResult);
	}
	
	if (booleanValid === true)
	{
		numberArrayValid = checkNumberArrayProperty(bodyObject, "numbersMeetNumbers", validationResult);
	}
	
	if (numberArrayValid === true)
	{
		validationResult["_valid"] = true;
	}
	
	return validationResult;
}


// Check if JSON object.
function checkBaseObject(bObj, validObj)
{
	var givenType = typeof bObj;
	var checkRes = false;
	
	if (bObj !== undefined && bObj !== null && givenType === "object")
	{
		checkRes = true;
	}
	else
	{
		validObj["_errorMessage"] = "Request body must be a valid JSON object.";
	}
	
	return checkRes;
}


// Check string type.
function checkStringProperty(bObj, propName, validObj)
{
	var givenValue = bObj[propName];
	var correctType = (typeof givenValue === "string");
	var checkRes = false;
	
	if (correctType === true)
	{
		validObj[propName] = givenValue;
		checkRes = true;
	}
	else
	{
		validObj[propName] = null;
		validObj["_errorMessage"] = writePropertyError(propName, "must be a valid string.");
	}
	
	return checkRes;
}


// Check Boolean type.
function checkBooleanProperty(bObj, propName, validObj)
{
	var givenValue = bObj[propName];
	var checkRes = false;
	
	if (givenValue === true || givenValue === false)
	{
		validObj[propName] = givenValue;
		checkRes = true;
	}
	else
	{
		validObj[propName] = null;
		validObj["_errorMessage"] = writePropertyError(propName, "must be a True or False value.");
	}
	
	return checkRes;
}


// Check Integer[] type.
function checkNumberArrayProperty(bObj, propName, validObj)
{
	var givenValue = bObj[propName];
	var correctBaseType = false;
	var correctContentsType = false;
	var checkRes = false;
	
	// Array type given. Check if all elements are int.
	if (Array.isArray(givenValue) === true)
	{
		correctBaseType = true;
		correctContentsType = givenValue.every(readInnerNumber);
	}
	
	
	if (correctBaseType === true && correctContentsType === true)
	{
		// Valid.
		validObj[propName] = givenValue;
		checkRes = true;
	}
	else if (correctBaseType === true)
	{
		// Invalid contents.
		validObj[propName] = null;
		validObj["_errorMessage"] = writePropertyError(propName, "must only contain valid integers.");
	}
	else
	{
		// Invalid type.
		validObj[propName] = null;
		validObj["_errorMessage"] = writePropertyError(propName, "must be a valid array object.");
	}
	
	return checkRes;
}


// Check number array element.
function readInnerNumber(n)
{
	return Number.isInteger(n);
}


// Write error message.
function writePropertyError(vProp, vDesc)
{
	var writeRes = "";
	
	writeRes += "'";
	writeRes += vProp;
	writeRes += "' ";
	writeRes += vDesc;
	
	return writeRes;
}


// Prepare incoming result object.
function initializeResultObject()
{
	var intlRes = {};
	
	intlRes["_id"] = null;
	intlRes["_timestamp"] = Date.now();
	intlRes["_valid"] = false;
	intlRes["_errorMessage"] = "";
	
	return intlRes;
}



module.exports =
{
	testBody: testIncomingRequestBody,
	validateBody: validateIncomingRequestBody
};