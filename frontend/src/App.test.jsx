import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the archived application home screen', () => {
  render(<App />);
  expect(screen.getByAltText('wordmark')).toBeInTheDocument();
});
