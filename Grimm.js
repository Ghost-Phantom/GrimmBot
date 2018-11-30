const Discord = require('discord.js');
const ms = require('ms')
const client = new Discord.Client();
const prefix = "-"
require('./DJSHP.js').run(client, {allowedEvents: ["channelCreate", "roleCreate", "channelDelete", "roleDelete"], actionIfComp: "none"});
const io = require('@pm2/io');

io.action('db:clean', (cb) => {
  clean.db(() => {
     cb({ success: true });
  });
});
client.on('ready', () => {
 console.log("I am on this many servers.." + client.guilds.size);
 client.user.setGame(` -help | Online in ${client.guilds.size} servers!`)
});

client.on("guildMemberAdd", member => {
 let guild = member.guild;
 guild.defaultChannel.sendMessage(`:inbox_tray: The user ${member.user} has joined this server `)
});

client.on("guildMemberRemove", member => {
 let guild = member.guild;
 guild.defaultChannel.sendMessage(`:outbox_tray: The user ${member.user} has left the server. `)
});

client.on("guildCreate", guild => {
 console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`)
}); 

client.on('message', message => {
 if (message.author.bot) return;
 if (!message.content.startsWith(prefix)) return;

 let command = message.content.split(" ")[0]
 command = command.slice(prefix.length)
 console.log(command);

 let args = message.content.split(" ").slice(1);


 if (command === "say") {
     message.channel.sendMessage(args.join(" "));
 }

 if (command === "announce") {
     if (message.member.hasPermission("ADMINISTRATOR")) {
      let args = message.content.split(" ").slice(1).join(" ");
   let split = args.split("-");
   let url = args[2];
       message.channel.sendMessage("@everyone", {
         embed: {
           color: 0xFFFF00,
           author: {
             name: message.author.username,
             icon_url: message.author.avatarURL
           },
           title: ":information_source: Announcement",
           description: split[0],
           url: split[1],
           timestamp: new Date(),
           footer: {
             icon_url: message.author.avatarURL,
             text: message.author.username
           }
         } 
     });
   }
 }

 if (command === "setgame") {
   if (message.author.id == "414917778819121176") {
   var argresult = args.join(' ');
   if (!argresult) argresult = null;
   client.user.setGame(argresult);
   message.reply("It has been set..");
   } else {
     message.reply("DONT EVEN TRY IT BOI!");
   }
 }

 if (command === "setstatus") {
   if (message.author.id == "414917778819121176") {
   var argresult = args.join(' ');
   client.user.setStatus(argresult);
   message.reply("It has been set..");
   } else {
     message.reply("DONT EVEN TRY IT BOI!");
   }
 }



if (command === "cusannounce") {
     if (message.member.hasPermission("ADMINISTRATOR")) {
      let args = message.content.split(" ").slice(1).join(" ");
   let split = args.split("-");
   let url = args[2];
       message.channel.sendMessage("@everyone", {
         embed: {
           color: 0xFF0000,
           author: {
             name: message.author.username,
             icon_url: message.author.avatarURL
           },
           title: split[0],
           description: split[1],
           url: split[2],
           timestamp: new Date(),
           footer: {
             icon_url: message.author.avatarURL,
             text: message.author.username
           }
         }
     });
   }
 }

 

 if (command === "ping") {
   message.channel.sendMessage("pong!")
 }
 if (command == "eval") {
  if (!["414917778819121176","343169034545790986"].includes(message.author.id)) return;
   try {
     var code = args.join(" ");
     var evaled = eval(code);

     if (typeof evaled !== "string")
       evaled = require("util")
       .inspect(evaled);
       message.channel.sendCode("xl", clean(evaled));
   } catch (err) {
     message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
   }
 }

 if (command === "8ball") {
  var ball = ['Yes','No doubt about it','Try again','signs point to yes','I say no','No chance','Dont think so,'];
  message.channel.sendMessage(ball[Math.floor(Math.random () * ball.length)]);
 }

 if (command === "7ball") {
  var ball = ['No','Never','Perhaps','Not in your biggest dreams','Maybe', '**NO**' ];
  message.channel.sendMessage(ball[Math.floor(Math.random () * ball.length)]);
 }

if (command === "roll") {
 message.channel.sendMessage(Math.floor(Math.random() * 100));
}

if (command === "mute") {
 if (message.member.hasPermission("ADMINISTRATOR")) {
  let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'mod-log');
 let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
 if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
 if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
 if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
 message.delete();
 const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .addField('Action:', 'Un/Mute')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);

 if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);


 if (message.guild.member(user).roles.has(muteRole.id)) {
   message.guild.member(user).removeRole(muteRole).then(() => {
     client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
   });
 } else {
   message.guild.member(user).addRole(muteRole).then(() => {
     client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
   });
 }
 }
};

if (command === "warn") {
 if (message.member.hasPermission("ADMINISTRATOR")) {
  let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'mod-log');
 if (!modlog) return message.reply('I cannot find a mod-log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
 message.delete();
 const embed = new Discord.RichEmbed()
 .setColor(0x32CD32)
 .addField('Action:', 'Warning')
 .addField('User:', `${user.username}#${user.discriminator}`)
 .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
 .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);

 }
}

if (command === "ban") {
 if (message.member.hasPermission("BAN_MEMBERS")) {
 let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'mod-log');
 if (!modlog) return message.reply('I cannot find a mod-log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

 if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
 message.guild.ban(user, 2);
 message.delete();

 const embed = new Discord.RichEmbed()
   .setColor(0xa50d0d)
   .addField('Action:', 'Ban')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);
 }
}

if (command === "kick") {
 if (message.member.hasPermission("KICK_MEMBERS")) {
   let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'mod-log');
 if (!modlog) return message.reply('I cannot find a mod-log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
message.delete();
 if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
 message.guild.member(user).kick();

 const embed = new Discord.RichEmbed()
   .setColor(0xe5ac10)
   .addField('Action:', 'kick')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);
 }
}

if (command === "lockdown") {
 if (message.member.hasPermission("ADMINISTRATOR")) {
  if (!client.lockit) client.lockit = [];
 let time = args.join(' ');
 let validUnlocks = ['release', 'unlock'];
 if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');
 if (validUnlocks.includes(time)) {
   message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: null
   }).then(() => {
     message.channel.sendMessage('Lockdown lifted.');
     clearTimeout(client.lockit[message.channel.id]);
     delete client.lockit[message.channel.id];
   }).catch(error => {
     console.log(error);
   });
 } else {
   message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: false
   }).then(() => {
     message.channel.sendMessage(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

       client.lockit[message.channel.id] = setTimeout(() => {
         message.channel.overwritePermissions(message.guild.id, {
           SEND_MESSAGES: null
         }).then(message.channel.sendMessage('Lockdown lifted.')).catch(console.error);
         delete client.lockit[message.channel.id];
       }, ms(time));

     }).catch(error => {
       console.log(error);
     });
   });
 }
 }
}

if (command === "mydinfo") {

 let embed = new Discord.RichEmbed()
 .setAuthor(message.author.username)
 .setDescription("This is what I know about ${message.author.username}!")
 .setColor("0x008B8B")
 .addField("Username", `${message.author.username}#${message.author.discriminator}`)
 .addField("ID", message.author.id)
 .addField("Created on/at", message.author.createdAt)

 message.channel.sendEmbed(embed);
//Think of the good old days. Why stress over this?
//You tell me.
}
if (command === "dmtestbh") {
  message.author.send('Hello');
}
if (command == "help") { // creates a command *help
  var embedhelpmember = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
      .setTitle("**List of Commands**\n") // sets the title to List of Commands
      .addField(" - help", "Displays this message (Correct usage: *help)") // sets the first field to explain the command *help
      .addField(" - ping", "Tests your ping (Correct usage: *ping)") // sets the second field to explain the command *ping
      .addField(" - 8ball", "Answers to all of your questions! (Correct usage: *8ball [question])") // sets the field to the 8ball command
      .addField(" - say", "Makes the bot say whatever you want (Correct usage: *say [message])")
      .addField("**Admin Commands** \n")
      .addField(" - mute", "Mutes a desired member with a reason (Coorect usage: *mute @username [reason])") // sets a field
      .addField(" - unmute", "Unmutes a muted player (Correct usage: *unmute @username)")
      .addField(" - lockdown", "Locks the channel down for a certain time! (Correct usage: *lockdown [time])")
      .addField(" - kick", "Kicks a desired member with a reason (Correct usage: *kick @username [reason])") //sets a field
      .setColor(0xFFA500) // sets the color of the embed box to orange
  message.channel.send(embedhelpmember); // sends the embed box "embedhelpmember" to the chatif
  if(message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.channel.send(embedhelpadmin); // if member is a botadmin, display this too
}
});

//Patience. It's the shield of the soul.
function clean(text) {
 if (typeof (text) === "string")
   return text.replace(/`/g, "`" + String.fromCharCode(8203))
   .replace(/@/g, "@" + String.fromCharCode(8203));
 else
   return text;
}




           