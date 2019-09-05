const path = require('path');
const http = require('http');
const fs = require('fs');


module.exports.sendData = async function(req,res){
   var sampleData = JSON.parse(fs.readFileSync(path.join(__dirname,"../test_data/samplePosts.json")));
   
   sampleData = JSON.stringify(sampleData);

   const options = {
         hostname: 'localhost',
         port: 5000,
         path: encodeURI('/api/buffer/postData'),
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Content-Length': sampleData.length
          }
    }

    var request = http.request(options, function(result) {
        
        res.on('data',(data)=>{
            res.status(200).send(data);
        });

    });

    request.on('error', (error) => {
        res.status(500).send(error);
    });

    request.write(sampleData);
    request.end();
}