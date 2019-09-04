const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const  bufferRouter = require(path.join(__dirname,'./routers/BufferRouter'));

app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

  
app.use('/*', function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            );
    next(); 
});

app.use('/api/buffer',bufferRouter);

app.listen(5000);

module.exports = app;