var slackbot = require('./lib/bot');
var http = require('http');
var querystring = require('querystring');
var incomingToken = '';
var outgoingToken = '';
var organization = 'swaeg';

var config = {
    organization: organization,
    server: 'irc.nerim.fr',
    nick: 'HAL2110i',
    username: 'HAL2110i',
    token: incomingToken,
    channels: {
        '#nakkiperse': '#random'
    },
    users: {
	'~tra': 'tra',
	'tra': 'tra',
	'toiminto': 'toiminto'
    },
    // optionals
    floodProtection: true,
    silent: false // keep the bot quiet
};

var slackbot = new slackbot.Bot(config);
slackbot.listen();


var server = http.createServer(function (req, res) {
  if (req.method == 'POST') {
    req.on('data', function(data) {
      var payload = querystring.parse(data.toString());

      if (payload.token == outgoingToken) {
        var ircMsg = "Slackis " + payload.user_name + " sano: " + payload.text;
        if (payload.user_name !== 'slackbot') {
            slackbot.speak('#nakkiperse', ircMsg);
        }
      }
    });
  } else {
    console.log('recieved request (not post)');
  }
  res.end('done');
});

server.listen(5555);
console.log("Server running at http://localhost:5555/");
