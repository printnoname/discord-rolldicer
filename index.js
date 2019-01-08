const Discord = require('discord.js');
var random = require('true-random');


const fs = require("fs");
const path = require("path");

let bot = new Discord.Client();

const token = process.env.BOT_TOKEN;

bot.on('ready',()=>{
  console.log("Alright, alright, alright")
});

bot.on('message', msg => {
  if (msg.content === 'dices, dude') {

    let gen = new random.true_rand(); //Create a number generator, this function accepts a cache_size, min_cache and a callback parameter
    let integer = gen.integer() //returns a integer between 0 and 1, you can pass diffrent min and max values with integer(min, max)
    let integer_array = gen.integers(0, 9, 8);

    var numbers = "";
    
    for(let i =0; i < integer_array.length; i++) {
      numbers+=integer_array[i];
    }

    msg.reply(numbers);
  }
});

bot.login(token);