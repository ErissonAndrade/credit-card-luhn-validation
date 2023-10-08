const { body, validationResult } = require('express-validator');

const validators = () => {
    return [
        body('cardNumber')
            .custom(value => {
                return isValidCreditCard(value)
            })
            .withMessage('Invalid credit card number.')
            .trim()
            .escape(),
        body('cardHolderName')
            .trim()
            .escape(),
        body('cardExpirationMonth')
            .isInt({ min: 1, max: 12 })
            .withMessage('Month must be a number between 1 and 12.')
            .trim()
            .escape(),
        body('cardExpirationYear')
            .trim()
            .escape(),
        body('cardCvv')
            .isLength({ min: 3, max: 4 })
            .withMessage('Your CVV must contain from 3 to 4 digits.')
            .trim()
            .escape(),
        body('cardExpirationMonth').custom((value, { req }) => {
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const submittedYear = parseInt(req.body.cardExpirationYear, 10);
            const submittedMonth = parseInt(value, 10);

            if (submittedYear < currentYear || (submittedYear === currentYear && submittedMonth < currentMonth)) {
                throw new Error('Card date should be greater than the current date.');
            }
            return true;
        })
    ]
}

const isValidCreditCard = (cardNumber) => {
    const creditCardNumbers = cardNumber.split('');

    let sum = 0;
    let doubleNumber = false;

    for (let i = creditCardNumbers.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (doubleNumber) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        doubleNumber = !doubleNumber;
        sum += digit;
    }

    return sum % 10 === 0;
};

const payment_post = [
    validators(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        return res.status(200).json({ message: 'Payment succesfull!' })
    }
]

module.exports = {
    payment_post
}