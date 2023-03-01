const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getSelfServicesController } = require('../../../controllers/employee-self-service');

router.get('/',ExpressCallback(getSelfServicesController));

module.exports = router;