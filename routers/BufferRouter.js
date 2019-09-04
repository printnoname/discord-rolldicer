

const path = require("path");
const express = require('express');

const  bufferController = require(path.join(__dirname,'../controllers/BufferController'));

const router = express.Router();

//router.post('/send',bufferController.sendData());
router.get('/profile',bufferController.getProfile);

module.exports = router;