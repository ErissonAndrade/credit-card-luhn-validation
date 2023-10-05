const { body, validationResult } = require('express-validator');

const validators = () => {
    // validators go here
}

const payment_get = (req, res, next) => {
   res.send("Payment page!");
}

module.exports = {
    payment_get
}