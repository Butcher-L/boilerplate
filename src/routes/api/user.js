const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../middlewares/express-callback');
const { verifyToken } = require('../../middlewares/token')

const {
    addUserController,
    getUsersController
} = require('../../controllers/users');

router.post('/add-user', ExpressCallback(addUserController));
router.get('/', verifyToken ,ExpressCallback(getUsersController));



module.exports = router;