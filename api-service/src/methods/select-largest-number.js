// Select the largest number from the array “numbersMeetNumbers”

function performMethod(inputIntegerArray)
{
	var correctBase = Array.isArray(inputIntegerArray);
	var correctContents = false;
	var methodResult = null;
	
	if (correctBase === true && inputIntegerArray.length > 0)
	{
		// Check if array only contains integers.
		correctContents = inputIntegerArray.every(checkValue);
	}
	
	if (correctContents === true)
	{
		// Retrieve largest number.
		inputIntegerArray.sort(decideOrder);
		methodResult = inputIntegerArray[0];
	}
	
	return methodResult;
}


// Check integer.
function checkValue(n)
{
	return Number.isInteger(n);
}


// Sort in descending order.
function decideOrder(a, b)
{
	return b - a;
}


module.exports =
{
	perform: performMethod
};