const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../middlewares/express-callback');
const { verifytoken } = require('../../middlewares/middleware')

const {
    addUserController,
    getUsersController
} = require('../../controllers/users');

router.post('/add-user', ExpressCallback(addUserController));
router.get('/', verifytoken ,ExpressCallback(getUsersController));



module.exports = router;