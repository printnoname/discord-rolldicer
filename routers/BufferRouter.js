const path = require("path");
const express = require('express');

const  bufferController = require(path.join(__dirname,'../controllers/BufferController'));

const router = express.Router();

router.post('/postData',bufferController.postData);
router.get('/profile',bufferController.getProfile);
module.exports = router;