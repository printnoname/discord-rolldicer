const path = require('path');
const https = require('https');
const fs = require('fs');

const bufferService = require(path.join(__dirname,'../services/BufferService.js'));

function requestProfileInfo(callback){

    const options = {
        hostname: 'api.bufferapp.com',
        port: 443,
        path: encodeURI('/1/profiles.json?access_token=2/8bc203801e7bb6de4c5a5b9c576671ba5adce7364ec370ebd72b54e8ee0ed438ad28ad1ce51adf3cfdc47519b590d7853e73e0aeb763adf1e36aa5cff14f087f'),
        method: 'GET'
    }


    var req = https.get(options, function(res) {

        var responseString = '';

        res.on('data', function(d){
          responseString += d;
        });

        res.on('end', function(){
          var responseObject = JSON.parse(responseString);
          return callback(null, responseObject);    
        });
      });

      req.end();

      req.on('error', function(e){
        return callback(e);
      });

}

module.exports.getProfile = async function (req,res) {
    return requestProfileInfo((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(bufferService.getProfileDataPretty(data));
        }
});
}

async function sendDataToBuffer(dataObject){
  
}


module.exports.postData = async function (req,res) {

  console.log(req.body);

  var sampleData = [
    {
    text:"Really enjoyed #coolhashtag doing this fun commission piece for John Henson as a gift to his American friends #friend Patrick Griffin who was Honourary Grand Marshal for the St Patricks day Parade this year here in Athlone. He's painted here with his partner Frances M McNicholas & with the Lord Mayor of Athlone Frankie Keena..Love the photo of them back home in Providence, Rhode Island after recieving their painting from John",
    type:"image",                               
    tags:{        
      facebook:"@placepoint.ireland",
      twitter:"@PlacePointApp",
      instagram:"@placepointapp"
    },
    image:"https://scontent.fala3-1.fna.fbcdn.net/v/t1.0-9/69466081_10157489558167433_8429176749249527808_n.jpg?_nc_cat=107&_nc_oc=AQnAIdIWKWLFDdmr9aIOpJ-SXuRvmYfcwJCpYK3ABKNAYdbE2FBG5kbDI0wUMGcOWqQ&_nc_ht=scontent.fala3-1.fna&oh=9725c22f56b6d50835f19107d57c303b&oe=5DFB238A",
    video:null,
    
    facebook_image_title:"facebook image",
    facebook_image_description:"facebook_descripton",
    facebook_image_link:"facebooklink.com",

  },
  {
    text:"Really enjoyed #coolhashtag doing this fun commission piece for John Henson as a gift to his American friends #friend Patrick Griffin who was Honourary Grand Marshal for the St Patricks day Parade this year here in Athlone. He's painted here with his partner Frances M McNicholas & with the Lord Mayor of Athlone Frankie Keena..Love the photo of them back home in Providence, Rhode Island after recieving their painting from John",
    type:"video",                               
    tags:{        
      facebook:"@placepoint.ireland",
      twitter:"@PlacePointApp",
      instagram:"@placepointapp"
    },
    image:"video",
    video:"https://www.youtube.com/watch?v=RYpRdsaNImc",
    
    facebook_image_title:"facebook image",
    facebook_image_description:"facebook_descripton",
    facebook_image_link:"facebooklink.com",
  },
  {
    text:"Really enjoyed #coolhashtag doing this fun commission piece for John Henson as a gift to his American friends #friend Patrick Griffin who was Honourary Grand Marshal for the St Patricks day Parade this year here in Athlone. He's painted here with his partner Frances M McNicholas & with the Lord Mayor of Athlone Frankie Keena..Love the photo of them back home in Providence, Rhode Island after recieving their painting from John",
    type:"plain",                               
    tags:{        
      facebook:"@placepoint.ireland",
      twitter:"@PlacePointApp",
      instagram:"@placepointapp"
    },
    image:null,
    video:null,
    
    facebook_image_title:"facebook image",
    facebook_image_description:"facebook_descripton",
    facebook_image_link:"facebooklink.com",
  }
];

var accounts = await bufferService.getActiveAcounts();

sampleData.forEach((element,key)=>{
  requestProfileInfo((err,data)=>{
    var accounts = bufferService.getActiveAcounts(data);

    accounts.forEach((account)=>{

      var preparedData = "";

      switch(account.service){
        case "twitter":
          preparedData = bufferService.prepareDataForTwitter(data);
          break;
        case "instagram":
           preparedData = bufferService.prepareDataForInstagram(data);
          break;
        case "facebook":
           preparedData = bufferService.prepareDataForFacebook(data);
          break;
        default:
           preparedData = bufferService.prepareDataForOthers(data);
          break;
      }

      //var result = await sendDataToBuffer(preparedData);
      

    });
  });
});

}