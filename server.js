var restify = require('restify');
var builder = require('botbuilder');
var sourceFile = require('./sourceFile');

//luis ai app model for MyU
var recognizer1 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=b746432a-7f7d-44be-92eb-900db813a733&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var dialog  = new builder.IntentDialog({ recognizers: [recognizer1] });

// Get secrets from server environment
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

// // // Setup Restify Server
var server = restify.createServer();
// Handle Bot Framework messages
server.post('/api/messages', connector.listen());
// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port|| process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

// Create bot root dialog
bot.dialog('/', dialog);

//App 1
dialog.matches('None', builder.DialogAction.send(sourceFile.None));
dialog.matches('WaterCome', builder.DialogAction.send(sourceFile.WaterCome));
dialog.matches('WhatsinWater', builder.DialogAction.send(sourceFile.WhatsinWater));
dialog.matches('HardWaterCreate',  builder.DialogAction.send(sourceFile.HardWaterCreate));
dialog.matches('HardWaterHarm',  builder.DialogAction.send(sourceFile.HardWaterHarm));
dialog.matches('HardWaterReduce',  builder.DialogAction.send(sourceFile.HardWaterReduce));
dialog.matches('LeadWater',  builder.DialogAction.send(sourceFile.LeadWater));
dialog.matches('ChlorineWater', builder.DialogAction.send(sourceFile.ChlorineWater));
dialog.matches('ThamesWaterLook', builder.DialogAction.send(sourceFile.ThamesWaterLook));
dialog.matches('UserWaterLook',  builder.DialogAction.send(sourceFile.UserWaterLook));
dialog.matches('WaterFilters',  builder.DialogAction.send(sourceFile.WaterFilters));
dialog.matches('Hardness',  builder.DialogAction.send(sourceFile.Hardness));

