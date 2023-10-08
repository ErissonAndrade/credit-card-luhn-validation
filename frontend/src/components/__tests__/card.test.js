import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../Card';

test('renders card component with correct props', () => {
  render(
    <Card
      name="John Doe"
      number="1234 5678 9101 1121"
      expirationMonth="12"
      expirationYear="23"
      cvv="123"
    />
  );

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('1234 5678 9101 1121')).toBeInTheDocument();
  expect(screen.getByText('12/23')).toBeInTheDocument();
  expect(screen.getByText('123')).toBeInTheDocument();
});

test('renders card component without crashing', () => {
  render(
    <Card
      name="John Doe"
      number="1234 5678 9101 1121"
      expirationMonth="12"
      expirationYear="23"
      cvv="123"
    />
  );

  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
