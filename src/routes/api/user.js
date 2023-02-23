const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../middlewares/express-callback');
const { verifyToken } = require('../../middlewares/token')

const {
    addUserController,
    getUsersController,
    updateUserController,
    getUserController,
    deleteUserController
} = require('../../controllers/users');

router.post('/add-user', ExpressCallback(addUserController));
router.get('/', verifyToken ,ExpressCallback(getUsersController));
router.put('/update/:id', verifyToken, ExpressCallback(updateUserController));
router.get('/get/:id', verifyToken, ExpressCallback(getUserController));
router.delete('/delete/:id', verifyToken, ExpressCallback(deleteUserController))

module.exports = router;