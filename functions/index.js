const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

"use strict";

//[{
//	"ask" : str Question,
//	str Reply : int NextIndex
//}]
const story = [
	{
		"ask:" : "You can go into the forest or take the clear road",
		"forest" : "",
		"open road" : ""
	}
];

const test = [
	"0","1","2","3","4","5","6","7","8","9"
];

const ActionsSdkApp = require("actions-on-google").ActionsSdkApp;

const NO_INPUTS = [
	"Sorry, what was that?",
	"I didn't quite catch that",
	"What?"
];

let i = 0;
let youme = "";
let youFound = false;
let index = 0;

exports.actions = functions.https.onRequest((req,res) => {
	const app  = new ActionsSdkApp({request: req, response: res});
	let input  = app.getRawInput().toLowerCase();
	let output = "";
	
	function mainIntent(app) {
		output = app.buildInputPrompt(true, 'Hello, my name is Eliza. What would you like to talk about?', NO_INPUTS); 
		app.ask(output);
	}
	
	function rawInput(app){
		if (input.indexOf("go away") !== -1) {
			app.tell("I hope I helped!");
		} else if (input.includes("feel")) {
			//~ let inputPrompt = app.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' + 
				//~ app.getRawInput() + '</say-as></speak>', NO_INPUTS);
			output = app.buildInputPrompt(true, "Do you often feel that way?", NO_INPUTS);
		} else if (input.indexOf("i am") !== -1) {
			index = input.indexOf("i am");
			output = "How long have you been" + input.substring(index+4) + "?";
		} else if (input.includes("you") && input.includes("me") && input.indexOf("you") < input.indexOf("me")){
			input = input.split(" ");
			output = "What makes you think I ";
			input.forEach( function(word){
				if (word === "you") {
					youFound = true;
				} else if (youFound) {
					if (word !== "me") {
						output += word + " ";
					}
				}
			});
			ouput += "?";
		} else {
			output = "Please go on";
		}
		
		app.ask(output);
	}
		
		let actionMap = new Map();
		actionMap.set(app.StandardIntents.MAIN, mainIntent);
		actionMap.set(app.StandardIntents.TEXT, rawInput);

  app.handleRequest(actionMap);
})
