const express = require('express');
const bodyParser = require('body-parser');
const paymentRouter = require('../paymentRouter.js');
const request = require('supertest');
const creditCardsModels = require('../testsModel/creditCardModels.js');

const app = express();
app.use(bodyParser.json());
app.use('/payment', paymentRouter)

it("Get payment page", (done) =>{
    request(app)
        .get('/payment')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response => {
            expect(response.body.message).toBe('This is the homepage!')
        })
        .end((err) => {
            if(err) return done(err);
            done();
        });
})

describe('POST /payment', () => {
    it("Should send status 400 and error if credit card number contain letters", (done) => {
        request(app)
            .post('/payment')
            .send({cardNumber: 'a123'})
            .expect(400)
            .expect(response => {
                expect(response.body.errors).toBeInstanceOf(Array);
                expect(response.body.errors.length).toBeGreaterThan(0);
                
                const expectedErrorMessage = 'Your credit card should have only numbers';

                expect(response.body.errors.some(error => error.msg === expectedErrorMessage)).toBe(true);
            })
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })

    it("Should check if a credit card number is invalid", (done) => {
        request(app)
            .post('/payment')
            .send({cardNumber: '378282246310025'})
            .expect(400)
            .expect(response => {
                expect(response.body.message).toBe('Invalid credit card number.')
            })
            .end((err) => {
                if(err) return done(err)
                done();
            })
    })

    creditCardsModels.map(creditCard => {
        it("Should check if a credit card number is valid", (done) => {
            request(app)
                .post('/payment')
                .send({cardNumber: creditCard.number})
                .expect(200)
                .expect(response => {
                    expect(response.body.message).toBe('Payment succesfull!')
                })
                .end((err) => {
                    if(err) return done(err)
                    done();
                })
        })
    })  
})


