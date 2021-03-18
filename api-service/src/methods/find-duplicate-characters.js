// Find any duplicates in the string “findDuplicates”


function performMethod(inputString)
{
	var correctType = (typeof inputString === "string");
	var methodResult = null;
	
	if (correctType === true)
	{
		methodResult = loopCharacters(inputString);
	}
	
	return methodResult;
}


// Loop string characters to find duplicates.
function loopCharacters(inpStr)
{
	var charIndex = 0;
	var currentChar = "";
	var currentDuplicate = -1;
	var currentUsed = false;
	
	var dupeRes = [];
	
	for (charIndex = 0; charIndex < inpStr.length; charIndex = charIndex + 1)
	{
		currentChar = inpStr.charAt(charIndex);
		currentDuplicate = inpStr.indexOf(currentChar, charIndex + 1);	// Search rest of string for char.
		currentUsed = dupeRes.includes(currentChar);
		
		// Character used again in rest of string, hasn't already been noted.
		if (currentDuplicate > charIndex && currentDuplicate < inpStr.length && currentUsed !== true)
		{
			dupeRes.push(currentChar);
		}
	}
	
	return dupeRes;
}



module.exports =
{
	perform: performMethod
};