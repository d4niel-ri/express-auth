const express = require('express');

const userRoute = require('./userRoute');
const postRoute = require('./postRoute');

const router = express.Router();

router.use("/user", userRoute);
router.use("/post", postRoute);

module.exports = router;