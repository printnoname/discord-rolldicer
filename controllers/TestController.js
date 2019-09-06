const path = require('path');
const http = require('http');
const fs = require('fs');
const axios = require('axios');

module.exports.sendData = async function(req,res){
   var sampleData = JSON.parse(fs.readFileSync(path.join(__dirname,"../test_data/samplePosts.json")));

//    var conn = axios.create({
//     baseURL:'localhost',
//     proxy:false,
//     port:5000
//    });

  axios.post('http://localhost:5000/api/buffer/postData',{
    body:sampleData
   });

}