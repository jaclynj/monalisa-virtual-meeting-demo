import React from 'react';
import { render, screen } from '@testing-library/react';
import MonalisaMessage from '../MonalisaMessage';

describe('MonalisaMessage', () => {
  const messageData = {
    who: 'Devin',
    meetingTitle: 'Show and Tell',
    meetingDate: '2020-05-10',
    meetingTime: '11:30'
  };

  it('renders the ASCII art', async () => {
    render(<MonalisaMessage messageData={messageData} />);
    const asciiArt = await screen.findByText(/Devin has a meeting called Show and Tell coming up in \d+ minutes/i);
    expect(asciiArt).toBeInTheDocument();
  });
});
