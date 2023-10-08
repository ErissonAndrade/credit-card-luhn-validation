import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardForm from '../CardForm';

test('renders card form component without crashing', () => {
  const onInputChange = jest.fn();
  const onSubmit = jest.fn();

  render(<CardForm onInputChange={onInputChange} onSubmit={onSubmit} />);

  expect(screen.getByLabelText(/card holder name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mm/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/yy/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

test('calls onInputChange when input values change', () => {
  const onInputChange = jest.fn();
  const onSubmit = jest.fn();

  render(<CardForm onInputChange={onInputChange} onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/card holder name/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText(/number/i), {
    target: { value: '1234 5678 9101 1121' },
  });
  fireEvent.change(screen.getByLabelText(/mm/i), {
    target: { value: '12' },
  });
  fireEvent.change(screen.getByLabelText(/yy/i), {
    target: { value: '23' },
  });
  fireEvent.change(screen.getByLabelText(/cvv/i), {
    target: { value: '123' },
  });

  expect(onInputChange).toHaveBeenCalledWith(expect.anything());
  expect(onInputChange).toHaveBeenCalledTimes(5);
});

test('calls onSubmit when the form is submitted', () => {
  const onInputChange = jest.fn();
  const onSubmit = jest.fn();

  render(<CardForm onInputChange={onInputChange} onSubmit={onSubmit} />);

  fireEvent.submit(screen.getByTestId('card-form'));

  expect(onSubmit).toHaveBeenCalled();
});
