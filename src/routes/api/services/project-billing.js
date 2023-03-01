const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getBillingsController } = require('../../../controllers/project-billing');

router.get('/',ExpressCallback(getBillingsController));

module.exports = router;