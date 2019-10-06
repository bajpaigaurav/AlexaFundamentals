'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'My Calculator';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Welcome to My Calculator by GB, you can try by saying add two number or add 5 and 10';
        //welcome screen message
        let displayText = "Welcome to My Calculator"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers
const AddIntentHandler = {
    canHandle(handlerInput){
      return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddIntent'
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;


        if( firstNumber && secondNumber) {
            // perform operation
            console.log('inputed data',firstNumber,secondNumber);
            let result = parseInt(firstNumber) + parseInt(secondNumber);
            speechText = `The result of ${firstNumber} plus ${secondNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder
                   .speak(speechText)
                   .withSimpleCard(appName,displayText)
                   .withShouldEndSession(false)
                   .getResponse();

        } else {
            // call fall back 
            return handlerInput.responseBuilder
            .addDeligateDirective(intent)
            .getResponse();
        }

    }
};

const SubstractionIntentHandler = {
    canHandle(handlerInput){
      return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'SubstractionIntent'
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;


        if( firstNumber && secondNumber) {
            // perform operation
            console.log('inputed data',firstNumber,secondNumber);
            let result = parseInt(secondNumber) - parseInt(firstNumber);
            speechText = `The result of ${firstNumber} minus ${secondNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder
                   .speak(speechText)
                   .withSimpleCard(appName,displayText)
                   .withShouldEndSession(false)
                   .getResponse();

        } else {
            // call fall back 
            return handlerInput.responseBuilder
            .addDeligateDirective(intent)
            .getResponse();
        }

    }
};

//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'Try Saying add 10 and 20';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye from My Calculator';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         AddIntentHandler,
                         SubstractionIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
