import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders App component without crashing', () => {
  render(<App />);
});

test('handles form submission and displays success message', async () => {
  axios.post.mockResolvedValue({ data: { success: true } });

  render(<App />);

  const nameInput = screen.getByLabelText(/card holder name/i);
  const numberInput = screen.getByLabelText(/number/i);
  const monthInput = screen.getByLabelText(/mm/i);
  const yearInput = screen.getByLabelText(/yy/i);
  const cvvInput = screen.getByLabelText(/cvv/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(numberInput, { target: { value: '1234 5678 9101 1121' } });
  fireEvent.change(monthInput, { target: { value: '12' } });
  fireEvent.change(yearInput, { target: { value: '23' } });
  fireEvent.change(cvvInput, { target: { value: '123' } });

  fireEvent.submit(screen.getByTestId('card-form'));

  await waitFor(() => {
    expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
  });
});
