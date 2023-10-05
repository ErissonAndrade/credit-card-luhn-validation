const express = require('express');
const paymentController = require('../controller/paymentController.js');

const router = express.Router();

router.get('/', paymentController.payment_get);

router.post('/', paymentController.payment_post);

module.exports = router;