const { Client, GatewayIntentBits } = require('discord.js');
const net = require('net');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Server informations
const servers = [
    { ip: 'CHANGE_IP_SERVER', port: '0', isOnline: false, name: 'Server 2' }, //Replace IP & port with the ones you want to check
    ];

// Follows last messages
const lastNotificationMessages = {};

client.once('ready', () => {
    console.log('Ready!');
    // check status every 10 minutes
    setInterval(checkServers, 600000);
});

async function checkServers() {
    for (const server of servers) {
        const isOnline = await isBeamMPServerOnline(server.ip, server.port);
        if (isOnline !== server.isOnline) {
            const channel = await client.channels.fetch('Canal_ID'); // Use the canal ID of the channel you want your messages in
            
            // Delete last message if existing
            if (lastNotificationMessages[server.name]) {
                try {
                    const messageToDelete = await channel.messages.fetch(lastNotificationMessages[server.name]);
                    await messageToDelete.delete();
                } catch (error) {
                    console.error("Error while deleting message :", error);
                }
            }
            
            // Send new message
            let sentMessage;
            if (isOnline) {
                sentMessage = await channel.send(`${server.name} (${server.ip}) is open! 🎉`);
            } else {
                sentMessage = await channel.send(`${server.name} (${server.ip}) is closed! 😢`);
            }
            lastNotificationMessages[server.name] = sentMessage.id;

            server.isOnline = isOnline; // Update server status
        }
    }
}

async function isBeamMPServerOnline(ip, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(5000); // Timeout 5000 ms (5 seconds)
        socket.once('connect', () => {
            resolve(true); // online server
            socket.end();
        }).on('timeout', () => {
            resolve(false); // offline server
            socket.destroy();
        }).on('error', () => {
            resolve(false); // offline server or connection error
            socket.destroy();
        }).connect(port, ip);
    });
}

client.login('TOKEN_BOT'); //YOUR BOT TOKEN
