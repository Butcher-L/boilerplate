const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../middlewares/express-callback');
const { loginController } = require('../../controllers/login');


router.post('/',ExpressCallback(loginController));

module.exports = router;