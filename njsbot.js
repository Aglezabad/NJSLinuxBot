'use strict';


function checkArgs(argv){
    if(argv.length !== 4){

    }
}

function startBot(){
    var config = require("./config.json");
    var pack = require("./package.json");
    var messages = require("./core/Messages")(config.level, config.locale);

    messages.greeting(pack.name, pack.version);
}

function setStatusMessage(){

}

startBot();

// /**
//  * Echo Bot - the XMPP Hello World
//  **/
// var xmpp = require("node-xmpp");
// var argv = process.argv;

// if (argv.length !== 4) {
//     console.error('Usage: node njsbot.js <my-jid> <my-password>');
//     process.exit(1);
// }

// var client = new xmpp.Client({
//     jid: argv[2],
//     password: argv[3],
//     host: "talk.google.com",
//     port: 5222,
//     reconnect: true
// });

// client.on('online', function() {
//     console.log('online')
//     client.send(new xmpp.Element('presence', { })
//       .c('show').t('chat').up()
//       .c('status').t('Happily echoing your <message/> stanzas')
//     )
// });

// client.on('stanza', function(stanza) {
//     if (stanza.is('message') &&
//       // Important: never reply to errors!
//       (stanza.attrs.type !== 'error')) {
//         // Swap addresses...
//         stanza.attrs.to = stanza.attrs.from;
//         delete stanza.attrs.from;
//         // and send back
//         console.log('Sending response: ' + stanza.root().toString());
//         client.send(stanza);
//     }
// });

// client.on('error', function(e) {
//     console.error(e);
// });