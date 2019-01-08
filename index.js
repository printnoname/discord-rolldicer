const Discord = require('discord.js');
const random = require('random');

let bot = new Discord.Client();

//const token = process.env.BOT_TOKEN;
const token = "NTMwMDMxODEyODE5NTUwMjA4.DxZdBg.0W9J7lTsUkD5o-P6BJtyFoSeHzg";

bot.on('ready', () => {
  console.log("Alright, alright, alright")
});

bot.on('message', msg => {
  if (msg.content === 'dices, dude') {

      let numbers = "";

      for (let i = 0; i < 8; i++) {
        numbers += random.int(0,9);
      }

      msg.reply(numbers);
  }
});

bot.login(token);