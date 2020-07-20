import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

test('renders hello kbase', () => {
    const { getByTestId } = render(<App />);
    // const linkElement = getByText(/Hello, KBase!/i);
    // expect(linkElement).toBeInTheDocument();
    expect(getByTestId('App')).toBeInTheDocument();
});
