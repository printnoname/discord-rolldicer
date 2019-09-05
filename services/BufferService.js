const path = require('path');
const fs = require('fs');


function getActiveAcounts(profileAccounts)
{
    var acceptedAccounts = [];

    if(profileAccounts != null && profileAccounts.length > 0)

    if(process.env.envType == "dev") {
        var configFileAccounts = JSON.parse(fs.readFileSync(path.join(__dirname,'../configs/dev_accounts.json')))["accounts"];
    } else {
        var configFileAccounts = JSON.parse(fs.readFileSync(path.join(__dirname,'../configs/prod_accounts.json')))["accounts"];
    }

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

function getActiveAccountsByType(accounts) {

}

module.exports.postOnTwitter = function (data) {

}

module.exports.postOnFacebook = function (data) {

}

module.exports.postOnInstagram = function (data) {

}

module.exports.postOnPinterest = function (data) {

}

module.exports.postOthers = function (data) {

}



