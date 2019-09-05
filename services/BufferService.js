const path = require('path');
const fs = require('fs');


function getActiveAcounts(profileAccounts)
{
    var acceptedAccounts = [];

    if(profileAccounts != null && profileAccounts.length > 0)
    var configFileAccounts = JSON.parse(fs.readFileSync(path.join(__dirname,'../configs/accounts.json')))["accounts"];

    profileAccounts.forEach((element,key)=>{
        var id = element.id;
        var exists = false;

        configFileAccounts.forEach((element1,key1) => {
            if(element1 == id) exists=true;
        });

        if(exists)
            acceptedAccounts.push(element);

    });

    return acceptedAccounts;
}


//Mock
function getApiToken(){
    return JSON.parse(fs.readFileSync(path.join(__dirname,"../configs/token.json")))["token"];
  }

module.exports.getProfileDataPretty = function (jsonData)
{
    var prettyfiedData = [];
    jsonData.forEach((element,key) => {
        prettyfiedData[key] = {
            id:element['_id'],
            service:element['service'],
            service_username:element['service_username']
        }
    });

    return prettyfiedData;
}

module.exports.prepareDataForTwitter = function (data) {

}

module.exports.prepareDataForFacebook = function (data) {

}

module.exports.prepareDataForInstagram = function (data) {

}

module.exports.prepareDataForOthers = function (data,account_id) {

    var preaparedData = {};

    var token = getApiToken();

    var postData="profile_ids[]=" + account_id + "&now=true";
    postData+="&text=" + encodeURI(data.text);

    switch(data.type){
        case "image":
            postData+="&media[photo]=" + encodeURI(data.image);
            break;
        case "video":
            postData+=" \r\n" + encodeURI(data.video);
            break;
        case "plain":
            break;
    }

    preaparedData.data = postData;

    preparedData.requestOptions =  {
        hostname: 'api.bufferapp.com',
        port: 443,
        path: encodeURI('/1/updates/create.json?access_token=' + token),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
    }
}



