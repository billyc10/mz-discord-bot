const content = require('./content.json');
const {users} = require('./config').config;

function pick_random(array) {
    return array[Math.floor(Math.random()*array.length)]
}

function inject_mention(message) {
    const name = message.substring(message.indexOf('<') + 1, message.indexOf('>'));
    
    if (name) {
        return message.replace(name, `@!${users[name]}`);
    } else {
        return message;
    }
}

function jeff_message() {
    message = "Scary Splash, Sporty Splash, Baby Splash, Ginger Splash, Posh Splash. Which Splash Boy are you?";
    //message = pick_random(content.jeff_messages);
    return inject_mention(message);
}

function valorant_message() {
    message = pick_random(content.valorant);
    return inject_mention(message);
}

function fallguys_message() {
    message = pick_random(content.fall_guys);
    return inject_mention(message);
}

function league_message() {
    return pick_random(content.league);
}

module.exports = {
    jeff_message,
    valorant_message,
    fallguys_message,
    league_message
}