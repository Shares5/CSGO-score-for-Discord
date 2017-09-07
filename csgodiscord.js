//Import http module
http = require('http');

port = 3000;
host = '127.0.0.1';
//----- [discord bot]

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'insert your token here';
// To run this as a selfbot you can follow the guide here to obtain the token to your account: https://github.com/TheRacingLion/Discord-SelfBot/wiki/Discord-Token-Tutorial

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Log our bot in
client.login(token);


//----- [/discordbot]

// Define http server to receive POST requests from the gamestate integration
server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	var myJSON = '';
	var myOutput = 'CSGO ';
	var isIngame = false;
	//Read the POST request payload
    req.on('data', function (data) {
		//Parse the JSON
		myJSON = JSON.parse(data.toString());
		//Add scores to the myOutput string
		if (readProperty(myJSON, 'map.team_ct.score') !== null) {
			isIngame = true;
			myOutput += '(CT '
			if (readProperty(myJSON, 'player.team') == "CT") {
				//Add an asterisk next to your current team 
				//(takes the team from the spectated player if you are dead so it may be innacurate outside of competitive)
				myOutput += '*'
			}
			myOutput += readProperty(myJSON, 'map.team_ct.score')
			myOutput += '-';
			myOutput += readProperty(myJSON, 'map.team_t.score')
			if (readProperty(myJSON, 'player.team') == "T") {
				myOutput += '*'
			}
			myOutput += ' T)';
		} else { 
			isIngame = false;
		}
    });
	//Called when the POST request has finished
    req.on('end', function () {
		console.log(myOutput);
		//make sure discord bot is started before trying to set a status
		if(client.user !== null) { 
			if(isIngame) {
				//Sets the Game on discord
				client.user.setGame(myOutput)
				//example output: CSGO (CT *12-10 T)
			} else {
				//Clear game status if not in a game
				client.user.setGame(null);
			}
		}		
        res.end('');
    });
});

/**
 * Helper function to read values under nested paths from objects
 *
 * @param object
 * @param string Dot separated path to the desired property in the object
 * @return mixed Null if the object has no requested property, property value otherwise
 */
function readProperty(object, property) {
    var value = null,
        properties = property.split('.');

    for (var i = 0; i < properties.length; i++) {
        if (!object.hasOwnProperty(properties[i])) {
            return null;
        }

        value = object[properties[i]];
        object = object[properties[i]];
    }

    return value;
}

//Launch http server
server.listen(port, host);

console.log('Monitoring CS:GO rounds');