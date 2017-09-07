# CSGO score for Discord game activity
Uses Gamestate Integration to include your score in your game activity on Discord

Setup Guide:

1. Install node.js
2. Open terminal/CMD and navigate to the folder containing csgodiscord.js
3. run the command 'npm install discord.js'
4. Edit csgodiscord.js and insert your authentication token on line 15 (info on how to get your token is in the comments inside the file)
5. run the command 'node csgodiscord.js'

If everything was succesful then you should receive a 'Monitoring CS:GO rounds' message followed by an 'I am ready!' message

It will look like this, but with an asterisk next to the team you're currently on  
![image](https://i.imgur.com/6O0FbQy.png) (need to update this screenshot, the out of place colon is no longer there)

Note: if you are running as a selfbot you will not be able to see the game on yourself, you may also need to disable automatic game activity in the discord client, haven't tested which one displays when both it and the bot are active

Thanks to tsuriga for his quickstart guide: https://github.com/tsuriga/csgo-gsi-qsguide/
Used one or two of his functions so i'll include his license too: https://github.com/tsuriga/csgo-gsi-qsguide/blob/master/LICENSE

Known bugs: Detects team from the currently spectated player if you are dead, can lead to the incorrect team showing if you arent playing comp
