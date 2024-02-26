It's a simple Discord bot that you need to host on your PC or use a VPS for.

First, you will need to create a bot on the Discord developer portal: https://discord.com/developers/

Next, create your bot and save your token.

Now, in the "Bot" section, enable the three intents under "Privileged Gateway Intents".

In the "OAuth2" section, select "Custom URL" for "Default Authorization Link" and check "bot" under scopes. Then, under bot permissions, check "send messages", "manage messages", and "read messages/view channel".

Copy the link it generates to invite the bot to your server.

-----Be sure that Node.js is installed------

Create a folder dedicated to your bot.

You can set up the bot by modifying the file with your information.

Open PowerShell in your folder and run the command 'npm init'.

Next, run the command 'npm install discord.js'.

Now, to run your bot, run the command 'node beammp.js' or whatever name you chose for your .js file.
