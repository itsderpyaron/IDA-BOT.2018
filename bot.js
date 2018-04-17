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


client.on("guildCreate", guild => {
  console.log(`Nieuwe server gejoined! ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} spelers!`);
});

client.on("guildDelete", guild => {
  console.log(`Ik ben net verwijderd van: ${guild.name} (id: ${guild.id})`);
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find("name", "welkom");
  if(!channel) return;
  channel.send(`Welkom ${member} op de ItsDerpyAron-Server:wink:. Lees even de regels door en heb veel plezier!`);
  member.addRole('Online')
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "welkom");
  if(!channel) return;
  channel.send(`${member} heeft de ItsDerpyAron-Server verlaten!`);
});

client.on("message", async message => {
      if (message.author.bot) return;
      if (message.content === 'ReactionTest') {
        message.channel.send('Succesfully!');



//hier onder alle commands!



  }
    if(message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        const msg = await message.channel.send("Pinging...");
        msg.edit(`${msg.createdTimestamp - message.createdTimestamp}ms.`);
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.delete();
        const embed = new Discord.RichEmbed().addField('Ping', `${ping}ms :ping_pong: `);
        message.channel.send(embed);

    }
    if (command === "partners") {
      const pembed = new Discord.RichEmbed()
        .setColor(0x0B97DE)
        .addField(`Dit zijn alle partners van ItsDerpyAron's Discord!`, `📛 **Naam:** RainbowNibbaSquad\n👑 **Owner:** RealRainbowNibba\n🏷 **Invite**: https://discord.gg/knx5m9E\n\n📛 **Naam:** Phantom Wadge’s Community\n👑 **Owner:** Phantom Wedge\n🏷 **Invite**: https://discord.gg/KwukgUw\n\n📛 **Naam:** Devin-Games\n👑 **Owner:** DevinJWZ\n🏷 **Invite**: https://discord.gg/R9CNajD\n\n📛 **Naam:** DGB-Games\n👑 **Owner:** Melvin\n🏷 **Invite**: https://discord.gg/FjSqXz8\n\n`)
        .setTimestamp()
      message.channel.send(pembed)
  }

  if(command === 'warn') {

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send("Ik kan deze gebruiker niet vinden.");
    if (!message.member.roles.find("name", "🔰 Staff-Team"))
      return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
    let wreason = args.join(" ").slice(22);

    let warnEmbed = new Discord.RichEmbed()
    .setColor("#ff0800")
    .addField("**Warn**", `**Gewarnde gebruiker:** ${wUser} ID ${wUser.id}\n**Gewarned door:** <@${message.author.id}> ID ${message.author.id}\n\n**Gewarned in:** ${message.channel}\n\n**Reden:** ${wreason}\n`)
    .setTimestamp()
    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("Ik kan de logs channel niet vinden.");

    message.delete().catch(O_o=>{});
    wUser.send(warnEmbed);
    logs.send(warnEmbed);

    return;

 }

 if (command === "clear") {

             if (!message.member.roles.find("name", "🔰Staff-Team")) {
                 return message.channel.send('Je hebt geen toegang tot dit commando! :no_entry:');
             }

             if (isNaN(args[0])) {
                 message.channel.send('Gebruik een juist argument! \n Usage: -clear');
                 return;
             }

             const fetched = await message.channel.fetchMessages({limit: args[0]});
             console.log(fetched.size + ' messages found, deleting...');

             message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));
            message.channel.send(`Ik heb ${fetched.size} berichten verwijderd!`).then(msg => msg.delete(5000))

 }

if(command === "help") {
  const cembed = new Discord.RichEmbed()
    .setColor(0x0B97DE)
    .addField(`Dit zijn alle commands van ItsDerpyAron's Bot!`, `Hier onder alle **Staff-Commands**\n:page_facing_up: **Clear** \n:pencil2: **Say** \n:warning: **Warn** \n:hammer: **Kick** \n:tools: **Ban** \n:hammer_pick: **Onderhoudstart** \n:hammer_pick: **Onderhoudstop** \n:exclamation: **live-melding**\n:card_index: **Dm** \nHier onder alle **Member-Commands**\n:pushpin: **Partners** \n:ping_pong: **Ping** \n:label: **Help**\n:robot: **Botinfo**\n:beginner: **serverinfo**\n:trophy: **Apply**\n:envelope_with_arrow: **Invite**`)
    .setFooter(`Aangevraagd door: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(cembed)


}


if(command === "say") {
  if (!message.member.roles.find("name", "Bot-Admin"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
  const sayMessage = args.join(" ");
  const embed = new Discord.RichEmbed()
  .setColor(`#23ff00`)
  .addField(`Nieuwe alert!`, sayMessage)
  .setTimestamp()
  .setFooter(`Geplaatst door: ${message.author.username}`, message.author.displayAvatarURL)
  message.delete().catch(O_o=>{});
  message.channel.send(embed);


}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);


  }


  if(command === "kick") {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Ik kan deze gebruiker niet vinden!");
    let kReason = args.join(" ").slice(22);
    if (!message.member.roles.find("name", "💂Moderator"))
      return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die persoon kan niet gekicked worden.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor(`#ff0800`)
    .addField("Gekickde gebruiker:", `${kUser} ID ${kUser.id}`)
    .addField("Gekicked door:", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("Om:", message.createdAt)
    .addField("Reden", kReason)
    .setTimestamp();

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Ik kan het logs kanaal niet vinden.");

    message.delete().catch(O_o=>{});
    kUser.send(kickEmbed).then(() => message.guild.member(kUser).kick(kReason));
    kickChannel.send(kickEmbed);

    return;


  }


if(command === "ban"){

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Ik kan deze gebruiker niet vinden!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.roles.find("name", "👮Admin"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die persoon kan niet gekicked worden.");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("**Ban**")
  .setColor(`#ff0800`)
  .addField("Gebande gebruiker:", `${bUser} ID ${bUser.id}`)
  .addField("Gebanned door:", `<@${message.author.id}> ID ${message.author.id}`)
  .addField("Om:", message.createdAt)
  .addField("Reden", bReason)
  .setTimestamp();

  let banChannel = message.guild.channels.find(`name`, "logs");
  if(!banChannel) return message.channel.send("Ik kan het logs kanaal niet vinden.");

  message.delete().catch(O_o=>{});
  bUser.send(banEmbed);
  banChannel.send(banEmbed);

  return;


}


if(command === "botinfo"){

  let boticon = client.user.displayAvatarURL
  let botembed = new Discord.RichEmbed()
  .setAuthor(`Bot informatie:`, boticon)
  .setColor(`#0074ff`)
  .addField("Bot naam:", "**ItsDerpyAron-Bot**")
  .setThumbnail(boticon)
  .addField("Gemaakt door:", "Aron | ItsDerpyAron, Sander | Sqnndertjuhh")
  .addField("Prefix:", "-")
  .addField("Copyright:", "*ItsDerpyAron-Bot© Copyright 2018 - 2019*")
  .setTimestamp()

  return message.channel.send(botembed)

}


if(command === "serverinfo"){

  let servericon = client.user.displayAvatarURL
  let serverembed = new Discord.RichEmbed()
  .setAuthor(`Server informatie:`, servericon)
  .setColor(`#0074ff`)
  .addField("Server naam:", message.guild.name)
  .setThumbnail(servericon)
  .addField("Gemaakt op:",  message.guild.createdAt)
  .addField("Jij bent gejoined op:", message.member.joinedAt)
  .addField("Aantal leden:", message.guild.memberCount)
  .setTimestamp();


  return message.channel.send(serverembed);


}
    
if(command === "apply"){

  let applyembed = new Discord.RichEmbed()
  .setColor(`#fff700`)
  .addField(`De rollen waar je voor kan applyen zijn:`,`:movie_camera:__**Streamers**__\n:ghost:__**Partner**__\n:cop::skin-tone-1:__**Helpers**__\n:guardsman::skin-tone-1:__**Moderators**__\n`)
  .addField(`Apply link:`,`https://goo.gl/forms/BNbInuGxdi8wbHrY2`)
  .setTimestamp();

  return message.channel.send(applyembed)


}

if(command === "invite"){
  let inviteembed = new Discord.RichEmbed()
  .setColor(`#5dff00`)
  .setDescription(`Dit is de invite link van de ItsDerpyAron-Server.`)
  .setDescription(`:envelope_with_arrow: **Invite**\nAls jij wil dat je vrienden hier ook gezellig komen chillen gebruik dan deze link,\n**Invite link:** https://discord.gg/CZKCATZ`)
  .setTimestamp();

return message.channel.send(inviteembed)


}

if(command === "onderhoudstart"){
  if(!message.member.roles.find("name", "Bot-Admin"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
  let onderhoudembed = new Discord.RichEmbed()
  .setColor(`#ff7400`)
  .setDescription(`:tools: **Onderhoud**, Hey @everyone ik ga vanaf nu onder onderhoud. Dit betekend dat sommige commmands tijdelijk niet meer zullen werken.`)
  .setTimestamp();

  let onderhoudstartChannel = message.guild.channels.find(`name`, "alerts");
  if(!onderhoudstartChannel) return message.channel.send("Ik kan het alerts kanaal niet vinden.");

  onderhoudstartChannel.send(onderhoudembed);


}


if(command === "onderhoudstop"){
  if(!message.member.roles.find("name", "Bot-Admin"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
  let onderhoudsembed = new Discord.RichEmbed()
  .setColor(`#70ff00`)
  .setDescription(`:tools: **Onderhoud**, Hey @everyone ik ben vanaf nu niet meer onder onderhoud. Dit betekend dat alle commands weer werken, als je problemen hebt of bugs gevonden hebt meld het aan een Admin of Owner!`)
  .setTimestamp();

  let onderhoudstopChannel = message.guild.channels.find(`name`, "alerts");
  if(!onderhoudstopChannel) return message.channel.send("Ik kan het alerts kanaal niet vinden.");

  onderhoudstopChannel.send(onderhoudsembed);


}


if(command === "live-melding") {
  if (!message.member.roles.find("name", "🎥 Streamers"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');
  const sayMessage = args.join(" ");
  const embed = new Discord.RichEmbed()
  .setColor(`#f700ff`)
  .addField(`Nieuwe live melding!`, sayMessage)
  .setTimestamp()
  message.delete().catch(O_o=>{});
  message.channel.send(embed);


}





if(command === "dm") {
  let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!dUser) return message.channel.send("Ik kan deze gebruiker niet vinden!");
  let dReason = args.join(" ").slice(22);
  if (!message.member.roles.find("name", "Bot-Admin"))
    return message.reply('Je hebt geen toegang tot dit commando! :no_entry:');

  let dmEmbed = new Discord.RichEmbed()
  .setDescription("**DM**")
  .setColor(`59ff00`)
  .addField("Bericht", dReason)
  .setTimestamp()

  let dmChannel = message.guild.channels.find(`name`, "logs");
  if(!dmChannel) return message.channel.send("Ik kan het logs kanaal niet vinden.");

  message.delete().catch(O_o=>{});
  dUser.send(dmEmbed);
  dmChannel.send(dmEmbed);

  return;


}

});
client.login(process.env.BOT_TOKEN);
