const { Client, GatewayIntentBits } = require('discord.js');
const net = require('net');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Informations et état initial des serveurs
const servers = [
    { ip: '82.125.254.39', port: '12479', isOnline: false, name: 'Serveur Secondaire' },
    { ip: '89.84.183.235', port: '9040', isOnline: false, name: 'Serveur Principal Relaxxmax' }
];

// Objet pour suivre les derniers messages de notification
const lastNotificationMessages = {};

client.once('ready', () => {
    console.log('Ready!');
    // Vérifier le statut des serveurs toutes les 10 minutes
    setInterval(checkServers, 600000); // Correction : 600000 ms = 10 minutes
});

async function checkServers() {
    for (const server of servers) {
        const isOnline = await isBeamMPServerOnline(server.ip, server.port);
        if (isOnline !== server.isOnline) {
            const channel = await client.channels.fetch('1211322205938388992'); // Utilisez l'ID de votre canal de notifications
            
            // Effacer le dernier message de notification pour ce serveur s'il existe
            if (lastNotificationMessages[server.name]) {
                try {
                    const messageToDelete = await channel.messages.fetch(lastNotificationMessages[server.name]);
                    await messageToDelete.delete();
                } catch (error) {
                    console.error("Erreur lors de la suppression du message :", error);
                }
            }
            
            // Envoyer le nouveau message de notification et stocker son ID
            let sentMessage;
            if (isOnline) {
                sentMessage = await channel.send(`${server.name} (${server.ip}) est ouvert! 🎉`);
            } else {
                sentMessage = await channel.send(`${server.name} (${server.ip}) est fermé! 😢`);
            }
            lastNotificationMessages[server.name] = sentMessage.id;

            server.isOnline = isOnline; // Mise à jour de l'état du serveur
        }
    }
}

async function isBeamMPServerOnline(ip, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(5000); // Temps d'attente avant d'abandonner, ici 5000 ms (5 secondes)
        socket.once('connect', () => {
            resolve(true); // Serveur en ligne
            socket.end();
        }).on('timeout', () => {
            resolve(false); // Serveur hors ligne
            socket.destroy();
        }).on('error', () => {
            resolve(false); // Serveur hors ligne ou erreur de connexion
            socket.destroy();
        }).connect(port, ip);
    });
}

client.login('VOTRE_TOKEN_BOT'); // Assurez-vous de sécuriser votre token de bot