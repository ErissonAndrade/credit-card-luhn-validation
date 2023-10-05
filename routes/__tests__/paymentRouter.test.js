const express = require('express');
const bodyParser = require('body-parser');
const paymentRouter = require('../paymentRouter.js');
const request = require('supertest');


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

it("Post credit card number", (done) => {
    request(app)
        .post('/payment')
        .send({creditCardNumber: '1111'})
        .expect(200)
        .expect(response => {
            expect(response.body.message).toBe('Payment succesfull!')
        })
        .end((err) => {
            if(err) return done(err);
            done();
        })
})

