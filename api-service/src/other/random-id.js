// This file generates random IDs for MongoDB objects.

const objectID = require("mongodb").ObjectID;
const baseTime = 1615686808;								// 2021-03-xx xx:xx:00


// Hexadecimal - Default
function generateRandomHex()
{
	var randHex = new objectID();
	return randHex;
}


// Integer
function generateRandomInteger()
{
	var generatedObject = null;
	var hexString = "";
	var timeHex = "";
	var timeNumber = -1;
	var counterHex = "";
	var counterNumber = -1;
	var joinText = "";
	
	var finalNumber = -1;
	
	
	// Use hexadecimal as basis.
	generatedObject = new objectID();
	hexString = generatedObject.toString();
	
	
	// Convert time portion of hex into number (Seconds since baseTime)
	timeHex = hexString.substr(0, 8);
	timeNumber = parseInt(timeHex, 16) - baseTime;
	
	
	// Convert random counter portion of hex into number.
	counterHex = hexString.substr(-5);
	counterNumber = parseInt(counterHex, 16);
	
	// Join the two numbers together.
	joinText = [timeNumber, counterNumber].join("");
	finalNumber = Number(joinText);
	
	return finalNumber;
}


module.exports =
{
	generateHex: generateRandomHex,
	generateInteger: generateRandomInteger
};