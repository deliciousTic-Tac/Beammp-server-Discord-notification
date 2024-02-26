It is a simple discord bot that you have to host on your pc or using a VPS.

First you will need to create a bot on the discord developper portal https://discord.com/developers/

Next, create your bot, and save your token.

Now, in the "Bot" section, enable the three Intent under "Privileged Gateway Intents"

In the "OAuth2" section, select custom URL for "Default Authorization Link" and check "bot" under scopes. Now under bot permissions, check send messages, manage messages, read messages/view channel.

Copy the link it generated to invite the bot on your server.

-----Be sure that Node.js is installed------

Create a folder dedicated for your bot

You can setup the bot by modifying the file with your informations.

Open a powershell in your folder and run the command 'npm init'

Next, run the command 'npm install discord.js'

Now to run your bot, run the command 'node beammp.js' Or the name you chose for your .js file.



