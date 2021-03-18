const mocha = require("mocha");
const chai = require("chai");
const validator = require("validator");
const randomID = require("../../api-service/src/other/random-id");
const incBody = require("../../api-service/src/other/inc-body");
const selectLargestNumber = require("../../api-service/src/methods/select-largest-number");
const findDuplicateCharacters = require("../../api-service/src/methods/find-duplicate-characters");
const removeWhitespace = require("../../api-service/src/methods/remove-whitespace");

const expect = chai.expect;

const exampleInput =
{
	findDuplicates: "HereWeHaveSomeDuplicatedCharacters",
	whiteSpacesGalore: "Can we replace all this white spaces without using replace please",
	validateMeOnlyIActuallyShouldBeABoolean: false,
	numbersMeetNumbers: [35,2,100,15,75,25,99]
};


describe("Select Largest Number", function()
{
	it("Example", function()
	{
		var inpArr = exampleInput["numbersMeetNumbers"];
		var chosenNumber = selectLargestNumber.perform(inpArr);
		expect(chosenNumber).to.equal(100);
	});
	
	it("Tied", function()
	{
		var inpArr = [1, 2, 3, 4, 5, 5, -4, -3, -2, -1];
		var chosenNumber = selectLargestNumber.perform(inpArr);
		expect(chosenNumber).to.equal(5);
	});
	
	it("Empty", function()
	{
		var emptyArr = [];
		var chosenNumber = selectLargestNumber.perform(emptyArr);
		expect(chosenNumber).to.be.null;
	});
	
	it("Mixed", function()
	{
		var mixedArr = [1, "2", 3, "4", 5, "6", 7.8, 9.1];
		var chosenNumber = selectLargestNumber.perform(mixedArr);
		expect(chosenNumber).to.be.null;
	});
	
	it("Invalid Type", function()
	{
		var chosenNumber = selectLargestNumber.perform("I am not an array");
		expect(chosenNumber).to.be.null;
	});
});


describe("Find Duplicate Characters", function()
{
	it("Example", function()
	{
		var inpString = exampleInput["findDuplicates"];
		var correctChars = ['H', 'e', 'r', 'a', 'c', 't'];
		var actualChars = findDuplicateCharacters.perform(inpString);
		
		expect(actualChars).to.be.an('array');
		expect(actualChars).to.have.members(correctChars);
	});
	
	it("Quick Brown Fox", function()
	{
		var correctChars = ["e", "h", "o", "r", "u", " "];
		var actualChars = findDuplicateCharacters.perform("The quick Brown Fox jumps over the lazy Dog.");
		
		expect(actualChars).to.be.an('array');
		expect(actualChars).to.have.members(correctChars);
	});
	
	it("No Duplicates", function()
	{
		var chosenChars = findDuplicateCharacters.perform("noduplicates");
		expect(chosenChars).to.be.an('array').that.is.empty;
	});
	
	it("Empty String", function()
	{
		var chosenChars = findDuplicateCharacters.perform("");
		expect(chosenChars).to.be.an('array').that.is.empty;
	});
	
	it("Invalid Type", function()
	{
		var chosenChars = findDuplicateCharacters.perform(123);
		expect(chosenChars).to.be.null;
	});
});


describe("Remove Whitespace", function()
{
	it("Example", function()
	{
		var inpString = exampleInput["whiteSpacesGalore"];
		var targetString = "Canwereplaceallthiswhitespaceswithoutusingreplaceplease"
		var resultText = removeWhitespace.perform(inpString);
		
		expect(resultText).to.equal(targetString);
	});
	
	it("Trim", function()
	{
		var resultText = removeWhitespace.perform("   hello-world   ");
		expect(resultText).to.equal("hello-world");
	});
	
	it("Tabs", function()
	{
		var tabbedString = ["Column 1", "Column 2", "Column 3"].join("\t");
		var resultText = removeWhitespace.perform(tabbedString);
		expect(resultText).to.equal("Column1Column2Column3");
	});
	
	it("Line Breaks", function()
	{
		var lineString = ["Line 1", "Line 2", "Line 3"].join("\r\n");
		var resultText = removeWhitespace.perform(lineString);
		expect(resultText).to.equal("Line1Line2Line3");
	});
	
	it("No Spaces", function()
	{
		var subjectString = "ihavenospace";
		var resultText = removeWhitespace.perform(subjectString);
		expect(resultText).to.equal(subjectString);
	});
	
	it("Empty", function()
	{
		var resultText = removeWhitespace.perform("");
		expect(resultText).to.equal("");
	});
	
	it("Invalid Type", function()
	{
		var resultText = removeWhitespace.perform(123);
		expect(resultText).to.be.null;
	});
});


describe("Other", function()
{
	it("Hexadecimal ID Generation", function()
	{
		var hexObject = randomID.generateHex();
		var hexString = undefined;
		var hexValid = false;
		
		expect(hexObject).to.not.be.undefined;
		expect(hexObject).to.not.be.null;
		expect(hexObject).to.be.an("object");
		expect(hexObject.toString).to.be.a("function");
		hexString = hexObject.toString();
		
		expect(hexString).to.be.a("string");
		expect(hexString.length).to.equal(24);
		hexValid = validator.isHexadecimal(hexString);
	});
	
	it("Random Integer ID Generation", function()
	{
		var resultNumber = randomID.generateInteger();
		var correctType = Number.isInteger(resultNumber);
		
		expect(correctType).to.be.true;
		expect(resultNumber).to.be.above(0);
	});
	
	it("Input Validation", function()
	{
		incBody.testBody(exampleInput);
	});
});