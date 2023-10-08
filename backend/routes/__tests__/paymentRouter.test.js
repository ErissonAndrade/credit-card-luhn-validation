const express = require('express');
const bodyParser = require('body-parser');
const paymentRouter = require('../paymentRouter.js');
const request = require('supertest');
const creditCardsModels = require('../testsModel/creditCardModels.js');

const app = express();
app.use(bodyParser.json());
app.use('/payment', paymentRouter)

describe('POST /payment', () => {
    it("Should check if a credit card number is invalid", (done) => {
        request(app)
            .post('/payment')
            .send({
                cardNumber: '378282246310025',
                cardHolderName: 'John Doe',
                cardExpirationMonth: '12',
                cardExpirationYear: '99',
                cardCvv: '123',
            })
            .expect(400)
            .expect(response => {
                expect(response.body.errors).toBeDefined()
            })
            .end((err) => {
                if (err) return done(err)
                done();
            })
    })

    creditCardsModels.map(creditCard => {
        it("Should check if a credit card number is valid", (done) => {
            request(app)
                .post('/payment')
                .send({
                    cardNumber: creditCard.number,
                    cardHolderName: 'John Doe',
                    cardExpirationMonth: '12',
                    cardExpirationYear: '99',
                    cardCvv: '123',
                })
                .expect(200)
                .expect(response => {
                    expect(response.body.message).toBe('Payment succesfull!')
                })
                .end((err) => {
                    if (err) return done(err)
                    done();
                })
        })
    })
})


