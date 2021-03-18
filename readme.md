# Telstra Neurodiversity Program 2021

### Introduction
This is my submission for a coding exercise that I have completed as part of the 'Telstra Neurodiversity Program'. The basic objective is to create a REST API using Spring Boot (Java) or Node JS, with a MongoDB database.

I have decided to brand this as a demo project for Node JS APIs and release it publicly for my coding portfolio.

---

### Specifications

Create a simple REST API service in Spring Boot (or Node JS), store the data in JSON format in MongoDB and perform some simple data validations:

* Store the JSON request in MongoDB (refer to below incoming request sample using "id":"{{$randomInt}}") into  an “incoming” collection.
* Validate the data types of the incoming JSON request. (string, boolean, integer)
* Build the following methods to manage the data and store the results in a MongoDB “outgoing” collection:
	* Select the largest number from the array “numbersMeetNumbers”
	* Find any duplicates in the string “findDuplicates”
	* Remove whitespaces from “whiteSpacesGalore” without using replace()
* Store the results of the above methods in a MongoDB “outgoing” collection for a GET request
* Write a unit test for one of the above methods (positive and negative)

```
{
    "id":"652",
    "findDuplicates": "HereWeHaveSomeDuplicatedCharacters",
    "whiteSpacesGalore": "Can we replace all this white spaces without using replace please",
    "validateMeOnlyIActuallyShouldBeABoolean": false,
    "numbersMeetNumbers": [35,2,100,15,75,25,99]
}
```

---

### Technologies Used
* Node JS (Backend)
* Express (REST API library)
* MongoDB (Database)
* Mocha/Chai (Unit testing)

---

### Installing
To run the API:
* Navigate to the 'api-service' folder.
* Run `npm install`
* Then, run `node server`
	* View this file for endpoints.

To run the unit tests:
* Navigate to the 'unit-tests' folder.
* Run `npm install`
* Then, run `npm test`
	* This command executes '/test/index.js'

---

### Disclaimer
This project has been licensed under MIT. I am branding this as a demo project that can be used as a basis for both personal and commercial projects.
