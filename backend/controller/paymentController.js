const { body, validationResult } = require('express-validator');

const validators = () => {
    return [
        body('cardHolderName')
            .isEmpty()
            .withMessage('You must provide a name.'),
        body('cardNumber')
            .isEmpty()
            .withMessage('You must provide a card number')
            .isNumeric(true)
            .withMessage('Your credit card should have only numbers.')
            .trim()
            .escape(),
        body('cardExpirationDate')
            .isEmpty()
            .withMessage('You must provide a date.'),
        body('cardCvv')
            .isEmpty()
            .withMessage('You must provide a cvv.')
            .isLength(3)
            .withMessage('CVV must be 3 characters')
    ]
}

const isValidCreditCard = (cardNumber) => {
    const creditCardNumbers = cardNumber.split('');

    let sum = 0;
    let doubleNumber = false;

    for(let i = creditCardNumbers.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

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
        const { cardNumber } = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }   

        else if(!isValidCreditCard(cardNumber)) {
            return res.status(400).json({message: 'Invalid credit card number.'})
        }

        return res.status(200).json({message: 'Payment succesfull!'})                
    }
]

module.exports = {
    payment_get,
    payment_post
}