const express = require('express');
const { verifyToken } = require('../../../middlewares/token')

const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getBillingsController } = require('../../../controllers/project-billing');

const router = express.Router();

router.get('/', verifyToken, ExpressCallback(getBillingsController));

module.exports = router;