const Discord = require('discord.js');

const fs = require("fs");
const path = require("path");

let bot = new Discord.Client();

const token = process.env.BOT_TOKEN;


bot.on('ready',()=>{
  console.log("Alright, alright, alright")
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(token);