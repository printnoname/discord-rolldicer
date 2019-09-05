const path = require("path");
const express = require('express');

const  testController = require(path.join(__dirname,'../controllers/TestController'));

const router = express.Router();

router.get('/sendData',testController.sendData);
module.exports = router;