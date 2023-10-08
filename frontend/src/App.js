import './App.css';
import Card from './components/Card';
import CardForm from './components/CardForm';
import { useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';

function App() {
  const [name, setName] = useState('YOUR NAME HERE');
  const [number, setNumber] = useState('0000 0000 0000 0000');
  const [expirationMonth, setExpirationMonth] = useState('12');
  const [expirationYear, setExpirationYear] = useState('25');
  const [cvv, setcvv] = useState('123');
  const [formMessages, setFormMessages] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const inputsMapping = [
      { inputName: 'card-holder-name', updateState: setName },
      { inputName: 'card-number', updateState: setNumber },
      { inputName: 'card-expiration-month', updateState: setExpirationMonth },
      { inputName: 'card-expiration-year', updateState: setExpirationYear },
      { inputName: 'card-cvv', updateState: setcvv }
    ]

    const matchedInput = inputsMapping.find(input => input.inputName === name);

    let updatedValue = value;

    if (matchedInput) {
      if (name === 'card-number') {
        updatedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      } else if (name === 'card-holder-name') {
        updatedValue = value.toUpperCase();
      }

      // Prevent users from entering non-numeric values
      const numberRegex = /^[0-9]*$/;

      if (name !== 'card-holder-name' && !numberRegex.test(value)) {
        updatedValue = value.replace(/\D/g, '');
        e.target.value = updatedValue;
      }

      matchedInput.updateState(updatedValue);
    }
  }

  const postCreditCard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardHolderName = formData.get('card-holder-name');
    const cardNumber = formData.get('card-number');
    const cardExpirationMonth = formData.get('card-expiration-month');
    const cardExpirationYear = formData.get('card-expiration-year');
    const cardCvv = formData.get('card-cvv');

    axios
      .post('http://localhost:5000/payment', {
        cardHolderName,
        cardNumber,
        cardExpirationMonth,
        cardExpirationYear,
        cardCvv
      })
      .then(response => {
        const data = response.data;
        if (data) {
          setPaymentSuccess(true)
        }
      })
      .catch(err => {
        setFormMessages(err.response.data.errors)
      })
  };

  return (
    <main>
      <div className="color-bg">
        <div className="card-container">
          <Card
            className="card-front"
            name={name}
            number={number}
            expirationMonth={expirationMonth}
            expirationYear={expirationYear}
            cvv={cvv}
          />
        </div>
      </div>
      <div className="no-color-bg">
        {paymentSuccess ? (
          <div className="success-message">
            Payment successful! Thank you for your purchase.
          </div>
        ) : (
          <div className="form-container">
            <CardForm onInputChange={handleInputChange} onSubmit={(e) => postCreditCard(e)} />
            <div className="form-messages">
              {formMessages.map(formMessage => // Ensure that form messages are only shown if they exist
                <div key={uniqid()}>{formMessage.msg}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
