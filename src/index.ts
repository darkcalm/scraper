import { Client } from 'discord.js';
import config from './config';

const { intents, prefix, token } = config;

const client = new Client({
  intents,
  presence: {
    status: 'online',
    activities: [{
      name: `${prefix}help`,
      type: 'LISTENING'
    }]
  }
});

client.on('ready', () => {
  console.log(`Logged in as: ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args[0];

    switch(command) {
      case 'ping':
        const msg = await message.reply('Pinging...');
        await msg.edit(`Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`);
        break;
    }
  }
});

client.login(token);
