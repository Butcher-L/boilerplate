const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../../middlewares/token')

const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getSelfServicesController } = require('../../../controllers/employee-self-service');

router.get('/', verifyToken, ExpressCallback(getSelfServicesController));

module.exports = router;