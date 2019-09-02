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

  var media = [];
  media["title"] = "My first tweet";
  media["description"] = "What about this one";
  media["photo"] = encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  media["picture"] = encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  media["link"] = encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  var profile_ids = [];
  profile_ids = ["5d6cdaa147c4bf29766fe730","5d6d1ec1addcc377765ed4d6","5d6d2225ac8f995ca4337aa5"];

  var postData = querystring.stringify({
    "profile_ids" : profile_ids,
    "now": true,
    "media" : media,
    "text": "posting stuff 3"
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


  // const options = {
  //   hostname: 'api.bufferapp.com',
  //   port: 443,
  //   path: encodeURI('/1/profiles.json?access_token=' + process.env.BUFFER_TOKEN),
  //   method: 'GET'
  // }

  const req = https.request(options, res => {

    var result = "";

    res.on('data', function (chunk) {
      result += chunk;
    });

    res.on('end', function () {
      console.log(result);
      response.end(result);
    });

    res.on('error', function (err) {
      console.log(err);
      request.end();
    })
  });

  req.on('error', error => {
    console.error(error)
    request.end();
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