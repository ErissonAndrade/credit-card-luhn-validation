const express = require('express');
const paymentController = require('../controller/paymentController.js');

const router = express.Router();

router.post('/', paymentController.payment_post);

module.exports = router;