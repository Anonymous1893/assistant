const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

"use strict";

const ActionsSdkApp = require("actions-on-google").ActionsSdkApp;

const NO_INPUTS = [
	"Sorry, what was that?",
	"I didn't quite catch that",
	"What?"
]

exports.actions = functions.https.onRequest((req,res) => {
	const app = new ActionsSdkApp({request: req, response: res});
	
	function mainIntent(app) {
		let inputPrompt = app.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
			'I can read out an ordinal like ' +
			'<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>', NO_INPUTS); 
		
		app.ask(inputPrompt);
	}
	
	function rawInput(app){
		if (app.getRawInput() === "bye") {
			app.teel("Googbye");
		} else {
			let inputPrompt = app.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' + 
				app.getRawInput() + '</say-as></speak>', NO_INPUTS);
			app.ask(inputPrompt);
		}
	}
		
		let actionMap = new Map();
		actionMap.set(app.StandardIntents.MAIN, mainIntent);
		actionMap.set(app.StandardIntents.TEXT, rawInput);

  app.handleRequest(actionMap);
})
