const { body, validationResult } = require('express-validator');

const validators = () => {
    body('creditCardNumber')
        .isNumeric(true)
        .withMessage('Your credit card should have only numbers')
        .trim()
        .escape()
}

const isValidCreditCard = (creditCardNumber) => {

}

const payment_get = (req, res, next) => {
   return res.status(200).json({message: 'This is the homepage!'})
}

const payment_post = (req, res, next) => {
    const { creditCardNumber } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(500).json({ error: errors.array() })
    }   

    return res.status(200).json({message: 'Payment succesfull!'})
}

module.exports = {
    payment_get,
    payment_post
}