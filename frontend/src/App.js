import './App.css';
import Card from './components/Card';
import CardForm from './components/CardForm';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('John doe');
  const [number, setNumber] = useState('0000 0000 0000 0000');
  const [expirationDate, setExpirationDate] = useState('12/25');
  const [cvv, setcvv] = useState('000');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const inputsMapping = [
      {inputName: 'card-holder-name', updateState: setName},
      {inputName: 'card-number', updateState: setNumber},
      {inputName: 'card-expiration-date', updateState: setExpirationDate},
      {inputName: 'card-cvv', updateState: setcvv}
    ]

    const matchedInput = inputsMapping.find(input => input.inputName === name);

    if (matchedInput) {
      matchedInput.updateState(value);
    }
  }

  const postCreditCard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardHolderName = formData.get('card-holder-name');
    const cardNumber = formData.get('card-number');
    const cardExpirationDate = formData.get('card-expiration-date');
    const cardCvv = formData.get('card-cvv');

    axios
      .post('http://localhost:5000/payment', {
        cardHolderName,
        cardNumber,
        cardExpirationDate,
        cardCvv
      })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(err => {
        console.error(err)
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
          expirationDate={expirationDate} 
          cvv={cvv}
        />
      </div>
    </div>
    <div className="no-color-bg">
      <CardForm onInputChange={handleInputChange} onSubmit={(e) => postCreditCard(e)}/>
    </div>
  </main>
  );
}

export default App;
