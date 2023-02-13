const { Client, Collection } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const fs = require('fs');
const prefixSchema = require('./src/Models/Prefix');
require('dotenv').config();
require("colors")

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Append variables to client variable
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./src/Commands');
client.discordTogether = new DiscordTogether(client);
client.config = process.env;
client.prefix = async message => {
    try {
        let custom;
        const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch(err => console.log(err));

        if (data) {
            custom = data.Prefix;
        } else {
            custom = process.env.PREFIX;
        }
        return custom;
    } catch (err) {}
};

// Initialize project
require('./src/Handler')(client);

// Initialize levelling function
require('./src/Utility/Levelling');

// Connect to database
require('./src/Handler/Mongoose');

client.login(process.env.TOKEN);


const http = require("http");
http.createServer((_, res) => res.end("Uptime")).listen(8080)

const ms = require("ms");
setInterval(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  }
}, ms("1m"));

// Anti Crash
    process.on('multipleResolves', (type, promise, reason) => {
      // console.log('✯ |=== [AntiCrash] | [multipleResolves] | [start] ===| ✯'.yellow.dim);
      // // console.log(type, promise, reason);
      // console.log('✯ |=== [AntiCrash] | [multipleResolves] | [end] ===| ✯`.yellow.dim);
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.log(`✯ |=== [AntiCrash] | [unhandledRejection] | [start] ====| ✯`.yellow.dim);
      console.log(reason);
      console.log('✯ |=== [AntiCrash] | [unhandledRejection] | [end] ===| ✯'.yellow.dim);
    });
    process.on('rejectionHandled', (promise) => {
      console.log('✯ |=== [AntiCrash] | [rejectionHandled] | [start] ===| ✯'.yellow.dim);
      console.log(promise);
      console.log('✯ |=== [AntiCrash] | [rejectionHandled] | [end] ===| ✯'.yellow.dim);
    })
    process.on("uncaughtException", (err, origin) => {
      console.log('✯ |=== [AntiCrash] | [uncaughtException] | [start] ===| ✯'.yellow.dim);
      console.log(err);
      console.log('✯ |=== [AntiCrash] | [uncaughtException] | [end] ===| ✯'.yellow.dim);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log('✯ |=== [AntiCrash] | [uncaughtExceptionMonitor] | [start] ===| ✯'.yellow.dim);
      console.log(err);
      console.log('✯ |=== [AntiCrash] | [uncaughtExceptionMonitor] | [end] ===| ✯'.yellow.dim);
    });