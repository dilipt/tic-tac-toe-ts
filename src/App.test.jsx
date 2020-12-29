import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App template test', () => {
  it('should render template App', () => {
    const { getByText } = render(<App />);
    expect(getByText('Frontend Template')).toBeTruthy();
  });
});
