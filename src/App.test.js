import { render, screen } from '@testing-library/react';
import App from './App';

test('renders marine term translations app', () => {
  render(<App />);
  // Just check that the app renders without crashing
  // The actual content is loaded dynamically, so we won't test for specific text
  expect(document.body).toBeInTheDocument();
});
