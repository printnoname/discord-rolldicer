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
const https = require('https')
const port = process.env.PORT || 5000
const querystring = require('querystring');


const requestHandler = (request, response) => {


  var id = "5d6cdaa147c4bf29766fe730"

  var postData = querystring.stringify({
    "profile_ids" : {id},
    "now": true,
    "media" : {"title":"test",'description':"test_description"}
  });

  const options = {
    hostname: 'api.bufferapp.com',
    port: 443,
    path: encodeURI('/1/updates/create.json?access_token=' + process.env.BUFFER_TOKEN),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }

  const req = https.request(options, res => {
    //console.log(`statusCode: ${res.statusCode}`)
    //console.log('headers:', res.headers);
  })

  console.log(req);
  
  req.on('error', error => {
    console.error(error)
  });

   req.write(postData);
   req.end();
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})