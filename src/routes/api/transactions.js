const express = require('express');
const router = express.Router();
const { ExpressCallback } = require('../../middlewares/express-callback');
const { verifyToken } = require('../../middlewares/token')

const {
  addTransactionController,
  updateTransactionController,
  getTransactionController,
  getTransactionsController,
  deleteTransactionController
} = require('../../controllers/transactions');

router.post('/add-transaction', verifyToken, ExpressCallback(addTransactionController));
router.put('/update/:id', verifyToken, ExpressCallback(updateTransactionController))
router.get('/get/:id', verifyToken, ExpressCallback(getTransactionController))
router.get('/', verifyToken, ExpressCallback(getTransactionsController)) 
router.delete('/delete/:id', verifyToken, ExpressCallback(deleteTransactionController))


module.exports = router;