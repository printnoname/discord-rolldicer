// const Discord = require('discord.js');
// const random = require('random');

// let bot = new Discord.Client();

// const token = process.env.BOT_TOKEN;

// bot.on('ready', () => {
//   console.log("Alright, alright, alright")
// });

// bot.on('message', msg => {
//   if (msg.content === 'dices, dude') {

//       let numbers = "";

//       for (let i = 0; i < 8; i++) {
//         numbers += random.int(0,9);
//       }

//       msg.reply(numbers);
//   }
// });

// bot.login(token);

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})