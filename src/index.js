const Discord = require('discord.js');
const client = new Discord.Client();

const {users, token, prefix} = require('./config').config;
const messageService = require('./messageService');

var countdown = 6;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);

    if (msg.author == users.self) return;

    const message = msg.content.toLowerCase();

    // Test message
    if (msg.content.startsWith(prefix)) {
        msg.reply('yes I\'m alive');
    }

    // If Jeffrey speaks
    if (msg.author == users.jeffrey) {
        msg.channel.send(messageService.jeff_message());
        return;
    }

    // If someone mentions valorant
    if (message.includes('valorant') || message.includes('val')) {
        msg.channel.send(messageService.valorant_message());
        return;
    }

    // If amanda mentions nichol (probably fall guys)
    if (msg.author == users.amanda && msg.content.includes(users.nichol)) {
        msg.channel.send(messageService.fallguys_message());
        return;
    }

    // If xavier messages, test if he's gay
    if (msg.author == users.xavier) {
        const initiateCountdown = () => {
            if (countdown == 0) {
                msg.channel.send("HA! GOTIMMMMMM");
                countdown = 6;
                return;
            }

            if (countdown == 6) {
                msg.channel.send("Ooft, saved by the bell");
                return;
            }

            msg.channel.send(countdown);
            countdown -= 1;
            setTimeout(initiateCountdown, 2000);
        }
        
        // Send the message at a random interval between 0 - 60 seconds after xavier is active in channel
        // If xavier responds reset the countdown and clear the rest of the messages.
        if (countdown != 6) {
            countdown = 6;
        } else if (countdown == 6) {
            countdown = 5;
            setTimeout(() => {
                msg.channel.send("Hey Xavier, if you don't respond in 5 seconds, you're gay");
                setTimeout(initiateCountdown, 1000);
            }, 20000*Math.random());
        }
    }
});

client.login(token);