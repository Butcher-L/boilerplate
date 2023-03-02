const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../../middlewares/token')

const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getDocumentsController } = require('../../../controllers/archieved-documents');

router.get('/', verifyToken, ExpressCallback(getDocumentsController));

module.exports = router;