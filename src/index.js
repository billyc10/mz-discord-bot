const Discord = require('discord.js');
const client = new Discord.Client();

const {users, token} = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author == users.self) return;

    if (msg.author == users.jeffrey) {
        msg.channel.send(`Woah woah hold up there. The big man <@!${users.jeffrey}> has graced us with his present? What a legend. What a brave brave man. Thank you.`)
    }

    const message = msg.content.toLowerCase();
    if (message.includes('valorant') || message.includes('val')) {
        msg.channel.send(`Valorant? Do we need one more? One more brave man such as <@!${users.jeffrey}> perhaps!`);
    }
});

client.login(token);