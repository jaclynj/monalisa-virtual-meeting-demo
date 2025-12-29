import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MonalisaMessage from '../pages/MonalisaMessage';

describe('MonalisaMessage', () => {
  const messageData = {
    who: 'Devin',
    meetingTitle: 'Show and Tell',
    meetingDate: '2020-05-10',
    meetingTime: '11:30'
  };

  test('renders MonalisaMessage component', async () => {
    render(<MonalisaMessage messageData={messageData} />);
    const asciiArtElement = await screen.findByText(/Devin has a meeting called Show and Tell coming up in/i);
    expect(asciiArtElement).toBeInTheDocument();
  });
});
