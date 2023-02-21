const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../express-callback');

const {
    addUserController,
} = require('../../controllers/users');

router.post('/add-user', ExpressCallback(addUserController));


module.exports = router;