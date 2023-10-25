const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const cardSchema = new Schema({
    cardNumber: Number,
    cardHolderName: String,
    cardExpirationMonth: Number,
    cardExpirationYear: Number,
    cardCvv: Number,
    cardExpirationMonth: Number,
}) 

cardSchema.pre('save', async (next) => {
    if(
        this.isModified('cardNumber') ||
        this.isModified('cardCvv') || 
        this.isNew
    ) {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashCardNumber = await bcrypt.hash(this.cardNumber, salt);
            const hashCardCvv = await bcrypt.hash(this.cardCvv);
            this.cardNumber = hashCardNumber;
            this.cardCvv = hashCardCvv;
            next()
        } catch(err) {
            console.error(err)
            next(err)
        }
    }
    
module.exports = mongoose.model('Card', cardSchema);
})