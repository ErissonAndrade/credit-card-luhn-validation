const { body, validationResult } = require('express-validator');

const validators = () => {
    return [
        body('creditCardNumber')
            .isNumeric(true)
            .withMessage('Your credit card should have only numbers')
            .trim()
            .escape()
    ]
}

const isValidCreditCard = (creditCardNumber) => {
    const creditCardNumbers = creditCardNumber.split('');

    let sum = 0;
    let doubleNumber = false;

    for(let i = creditCardNumbers.length - 1; i >= 0; i--) {
        let digit = parseInt(creditCardNumber.charAt(i), 10);

        if(doubleNumber) {
            digit *= 2;
            if(digit > 9) {
                digit -= 9;
            }
        }

        doubleNumber = !doubleNumber;
        sum += digit;
    }

    return sum % 10 === 0;
};


const payment_get = (req, res, next) => {
   return res.status(200).json({message: 'This is the homepage!'})
}

const payment_post = [
    validators(),

    (req, res, next) => {
        const { creditCardNumber } = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }   

        else if(!isValidCreditCard(creditCardNumber)) {
            return res.status(400).json({message: 'Invalid credit card number.'})
        }

        return res.status(200).json({message: 'Payment succesfull!'})                
    }
]

module.exports = {
    payment_get,
    payment_post
}