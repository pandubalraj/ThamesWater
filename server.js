var restify = require('restify');
var builder = require('botbuilder');
var sourceFile = require('./sourceFile');

//luis ai app model for MyU
//var recognizer1 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v2.0/apps/1d787b4e-3a61-4da2-ae05-f050e7e39d0b?subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var recognizer1 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=1d787b4e-3a61-4da2-ae05-f050e7e39d0b&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var intents  = new builder.IntentDialog({ recognizers: [recognizer1] });

// // // Setup Restify Server
var server = restify.createServer();
// Handle Bot Framework messages

server.listen(process.env.port|| process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
// Get secrets from server environment
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// Create bot root dialog
bot.dialog('/', intents);

//App 1
intents.matches('None', builder.DialogAction.send(sourceFile.None));
intents.matches('WaterCome', builder.DialogAction.send("test intent result"));
intents.matches('WhatsinWater', builder.DialogAction.send(sourceFile.WhatsinWater));
intents.matches('HardWaterCreate',  builder.DialogAction.send(sourceFile.HardWaterCreate));
intents.matches('HardWaterHarm',  builder.DialogAction.send(sourceFile.HardWaterHarm));
intents.matches('HardWaterReduce',  builder.DialogAction.send(sourceFile.HardWaterReduce));
intents.matches('LeadWater',  builder.DialogAction.send(sourceFile.LeadWater));
intents.matches('ChlorineWater', builder.DialogAction.send(sourceFile.ChlorineWater));
intents.matches('ThamesWaterLook', builder.DialogAction.send(sourceFile.ThamesWaterLook));
intents.matches('UserWaterLook',  builder.DialogAction.send(sourceFile.UserWaterLook));
intents.matches('WaterFilters',  builder.DialogAction.send(sourceFile.WaterFilters));
intents.matches('Hardness',  builder.DialogAction.send(sourceFile.Hardness));

