const Discord = require("discord.js");
const TOKEN = "NDE2MjQ4MDIxMDQzNjQyMzY5.DXsRVQ.FLk1hVK5TtYC1i8yASGPuytPkgw"
const PREFIX = "-"
const msg = 'message'
const { version } = require("discord.js");

const client = new Discord.Client();

client.on("ready", function() {
    console.log(`ItsDerpyAron-Bot is online!\nLogged in as ${client.user.tag}!\nReady to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);

    // client.user.setUsername('UNKNOWN');
    client.user.setStatus('Online');
    client.user.setActivity('-help | 🔥ItsDerpyAron🔥 ', { type: 'WATCHING' });

});
client.login(process.env.BOT_TOKEN);
