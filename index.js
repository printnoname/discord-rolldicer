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

  media = {
  "title":"My first tweet",
  "description":"What about this one",
  "photo":"http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&",
  "picture":"http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&",
  "link":"http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&"
  }

  //media["title"] = "My first tweet";
  //media["description"] = "What about this one";
  //media["photo"] = "http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&" //encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  //media["picture"] = "http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&" //encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  //media["link"] = "http%3A%2F%2Fgoogle.com%2Fimages%2Flogo.png&" // encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  
  var profile_ids = [];
  profile_ids[0] = "5d6cdaa147c4bf29766fe730";
  profile_ids[1] = "5d6d1ec1addcc377765ed4d6";
  profile_ids[2] = "5d6d2225ac8f995ca4337aa5";

  // var postData = querystring.stringify({
  //   "profile_ids" : "profile_ids[]=5d6cdaa147c4bf29766fe730&profile_ids[]=5d6d1ec1addcc377765ed4d6&profile_ids[]=5d6d2225ac8f995ca4337aa5",
  //   "now": true,
  //   //"media" : media,
  //   "text": "posting stuff 22"
  // });

 var postData = "profile_ids[]=5d6cdaa147c4bf29766fe730&profile_ids[]=5d6d1ec1addcc377765ed4d6&profile_ids[]=5d6d2225ac8f995ca4337aa5&text=hmmmmmm&now=true";
 postData+="&text=via @norimyxxxo " + encodeURI("text main 8 ") + encodeURI(" https://media.gettyimages.com/photos/spring-field-picture-id539016480") + encodeURI(" https://cdn.images.express.co.uk/img/dynamic/151/590x/Black-hole-picture-please-time-date-first-image-black-hole-event-horizon-telescope-1112295.webp?r=1554889792953");
 postData+="&media[photo]=" + encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
 postData+="&media[photo]=" + encodeURI("https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
 // postData+="&media[picture]=" + encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480"); 
  //postData+="&media[link]=" + encodeURI("https://media.gettyimages.com/photos/spring-field-picture-id539016480");
  //postData+="&media[description]=" + encodeURI("media description");

  //console.log(postData);

  const options = {
    hostname: 'api.bufferapp.com',
    port: 443,
    path: encodeURI('/1/updates/create.json?access_token=2/8bc203801e7bb6de4c5a5b9c576671ba5adce7364ec370ebd72b54e8ee0ed438ad28ad1ce51adf3cfdc47519b590d7853e73e0aeb763adf1e36aa5cff14f087f'),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }


  // const options = {
  //   hostname: 'api.bufferapp.com',
  //   port: 443,
  //   path: encodeURI('/1/profiles.json?access_token=2/8bc203801e7bb6de4c5a5b9c576671ba5adce7364ec370ebd72b54e8ee0ed438ad28ad1ce51adf3cfdc47519b590d7853e73e0aeb763adf1e36aa5cff14f087f'),
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

  console.log(req.body);
  console.log(req.getHeaders());

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