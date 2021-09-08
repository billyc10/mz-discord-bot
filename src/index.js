const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios').default;

const {users, token, prefix} = require('./config').config;
const messageService = require('./messageService');
const poeService = require('./poeService');

var league = 'Expedition';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.author.bot) return;

    const message = msg.content.toLowerCase();

    // Test message
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        
        if(command == 'woah') {
            msg.reply('yes I\'m alive');
            return;
        }

        if(command == 'price' || command == 'p') {
            const queryString = args.join(' ');

            let response = await poeService.queryItem(queryString);

            const searchResults = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Search "${queryString}" in ${league}`)
                .setURL(response.url)
                
                .setTimestamp()
            
            if (response.itemList.length > 0) {
                searchResults
                    .setDescription(`Top ${response.itemList.length} results (total ${response.total})`)
                    .setThumbnail(response.itemList[0].icon)
                response.itemList.forEach( item => {
                    searchResults.addField(`${item.name[0]} (${item.price})`, `${item.name[1]}`)
                });
            } else {
                searchResults.setDescription('No results found');
            }
            
            msg.channel.send(searchResults);
        }

        
    }

    // amanda
    if (message.includes('amanda') || message.includes(users.amanda)) {
        msg.channel.send('Amanda? She\'s pretty cool I must say!');
        return;
    }

    // If someone mentions valorant
    if (message.includes('valorant') || message.includes('val')) {
        msg.channel.send(messageService.valorant_message());
        return;
    }

    // If someone mentions league
    if (message.includes('league')) {
        msg.channel.send(messageService.league_message());
        return;
    }

    if (message.includes('oce')) {
        msg.channel.send(':peepoRun: OCE WILL NOT BE SILENCED :peepoRun: OCE WILL NOT BE SILENCED :peepoRun: OCE WILL NOT BE SILENCED :peepoRun: OCE WILL NOT BE SILENCED :peepoRun: OCE WILL NOT BE SILENCED');
        return;
    }

    // If amanda mentions nichol (probably fall guys)
    if (msg.author == users.amanda && msg.content.includes(users.nichol)) {
        msg.channel.send(messageService.fallguys_message());
        return;
    }

    if (msg.content == 'F') {
        const FText = new Discord.MessageEmbed()
            .setImage('https://i.imgur.com/8SngqSs.png')
        msg.channel.send(FText);
        return;
    }

    // If someone says RIP...
    if (message.includes('rip ')) {
        words = message.split(' ');
        index = words.findIndex((x) => x == 'rip') + 1;
        
        // the thing that passed away :'()
        target = words[index];

        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

        const ripText = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Here lies ${target.toUpperCase()}`)
            .setDescription('Gone but not forgotten, they will be sorely missed.')
            .addField(dateStr, 'Rest In Pieces')
            .setImage('https://i.imgur.com/kT7Uhu2.png')
            .setTimestamp()

        msg.channel.send(ripText);
        return;
    }
});

client.login(token);