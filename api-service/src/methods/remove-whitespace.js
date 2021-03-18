// Remove whitespaces from “whiteSpacesGalore” without using replace()

function performMethod(inputString)
{
	var correctType = (typeof inputString === "string");
	var whitespaceSubstrings = [];
	var searchPerformed = false;
	var whitespaceFound = false;
	
	var methodResult = null;
	
	if (correctType === true)
	{
		whitespaceSubstrings = inputString.match(/\s+/g);		// Search for whitespace.
		searchPerformed = true;
		whitespaceFound = Array.isArray(whitespaceSubstrings);
		
	}
	
	
	if (searchPerformed === true && whitespaceFound === true)
	{
		// Remove whitespace.
		methodResult = loopWhitespaceRemoval(inputString, whitespaceSubstrings);
	}
	else if (searchPerformed === true)
	{
		// No whitespace found - Return original.
		methodResult = inputString;
	}
	else
	{
		methodResult = null;
	}
	
	return methodResult;
}


// Loops whitespace substrings.
function loopWhitespaceRemoval(inpString, wsArr)
{
	var matchIndex = 0;			// Substring index.
	var startPoint = 0;			// Index within full string.
	
	var currentMatch = "";
	var currentCutoff = -1;
	var currentSafeText = "";
	
	var textRes = "";
	
	for (matchIndex = 0; matchIndex < wsArr.length; matchIndex = matchIndex + 1)
	{
		// Read current whitespace and find location.
		currentMatch = wsArr[matchIndex];
		currentCutoff = inpString.indexOf(currentMatch, startPoint);
		currentSafeText = "";
		
		// Whitespace exists.
		if (currentCutoff >= startPoint && currentCutoff < inpString.length)
		{
			// Substring text until whitespace. Add to result.
			currentSafeText = inpString.substring(startPoint, currentCutoff);
			textRes += currentSafeText;
			
			// Skip whitespace.
			startPoint = currentCutoff + currentMatch.length;
		}
	}
	
	// Add final substring to result.
	textRes += inpString.substring(startPoint);
	return textRes;
}


module.exports =
{
	perform: performMethod
};