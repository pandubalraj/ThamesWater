var restify = require('restify');
var builder = require('botbuilder');
var sourceFile = require('./sourceFile');

//luis ai app model for MyU
var recognizer1 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=b746432a-7f7d-44be-92eb-900db813a733&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var recognizer2 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=37d62173-2e8e-45e0-96fa-6b5e054096da&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var recognizer3 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=9ef81def-abde-4531-8470-af3024ab7d57&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var dialog  = new builder.IntentDialog({ recognizers: [recognizer1, recognizer2, recognizer3] });

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
dialog.matches('Insurance', builder.DialogAction.send(sourceFile.Insurance));
dialog.matches('CIMandate', builder.DialogAction.send(sourceFile.CIMandate));
dialog.matches('CITypes',  builder.DialogAction.send(sourceFile.CITypes));
dialog.matches('Policy',  builder.DialogAction.send(sourceFile.Policy));
dialog.matches('LiabilityPolicy',  builder.DialogAction.send(sourceFile.LiabilityPolicy));
dialog.matches('CICompPackage',  builder.DialogAction.send(sourceFile.CICompPackage));
dialog.matches('AddOnCover', builder.DialogAction.send(sourceFile.AddOnCover));
dialog.matches('Exclusion', builder.DialogAction.send(sourceFile.Exclusion));
dialog.matches('Duration',  builder.DialogAction.send(sourceFile.Duration));
dialog.matches('InspectVehicle',  builder.DialogAction.send(sourceFile.InspectVehicle));
dialog.matches('Premium',  builder.DialogAction.send(sourceFile.Premium));
dialog.matches('CarEval', builder.DialogAction.send(sourceFile.CarEval));
dialog.matches('IDV',  builder.DialogAction.send(sourceFile.IDV));
dialog.matches('PlaceOfReg',  builder.DialogAction.send(sourceFile.PlaceOfReg));
dialog.matches('DiffCompPremium',  builder.DialogAction.send(sourceFile.DiffCompPremium));
dialog.matches('Discounts',  builder.DialogAction.send(sourceFile.Discounts));
dialog.matches('Deductible',  builder.DialogAction.send(sourceFile.Deductible));
dialog.matches('Claim',  builder.DialogAction.send(sourceFile.Claim));
dialog.matches('Greeting', builder.DialogAction.send(sourceFile.Greeting));
