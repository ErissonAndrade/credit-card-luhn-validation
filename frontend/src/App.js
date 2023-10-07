import './App.css';
import Card from './components/Card';
import CardForm from './components/CardForm';
import { useState } from 'react';

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
      <CardForm onInputChange={handleInputChange}/>
    </div>
  </main>
  );
}

export default App;
