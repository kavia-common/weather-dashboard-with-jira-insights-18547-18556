import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders header title', () => {
  render(<App />);
  const title = screen.getByText(/Weather Dashboard/i);
  expect(title).toBeInTheDocument();
});
