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

module.exports.postData = async function (req,res) {
    res.status(200).send(req.body);
}


    // let rate = req.body.rate;
    // Tape.model.find({_id:req.params.id},function (err,result) {
    //     if(err) res.status(500).send(err);
    //     else {
    //         if(result.length<=0) res.status(404).send("Tape not found");
    //         else {
    //             let _tape = result[0];

    //             if(module.exports.alreadyRated(_tape.ratings,req.jwt.id)){
    //                 res.status(403).send("Already rated");
    //             } else {
    //                 _tape.update(
    //                     {$push:{ratings: {rate:rate,byUser:req.jwt.id}}},
    //                     function (err,updateResult) {
    //                         if(err) res.status(500).send(err);
    //                         else res.status(200).send(_tape);
    //                     }
    //                 );
    //             }
    //         }
    //     }
    // });


// module.exports.sendData = async function (req,res) {
//     Tape.model.find({id:req.params.id},function (err,result) {
//         if(err) res.status(500).send(err);
//         else {
//             if(result.length<=0) res.status(404).send("Tape not found");
//             else {
//                 let _tape = result[0];

//                 _tape.update({highlighted:true},
//                         function (err,updateResult) {
//                             if(err) res.status(500).send(err);
//                             else res.status(200).send(_tape);
//                         }
//                     );
//                 }
//             }
//     });
//}