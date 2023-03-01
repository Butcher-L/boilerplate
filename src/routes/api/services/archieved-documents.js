const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../../middlewares/express-callback');
const { getDocumentsController } = require('../../../controllers/archieved-documents');

router.get('/',ExpressCallback(getDocumentsController));

module.exports = router;