let config = {}

config['prefix'] = '!'
config['token'] = process.env.TOKEN || require('./secrets/config.json')['token'];
config['users'] = process.env.USERS ? JSON.parse(process.env.USERS) : require('./secrets/config.json')['users'];

module.exports = {
    config
}