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

  it('handles missing message data', async () => {
    const incompleteMessageData = {
      who: '',
      meetingTitle: '',
      meetingDate: '',
      meetingTime: ''
    };
    render(<MonalisaMessage messageData={incompleteMessageData} />);
    const asciiArt = await screen.findByText(/ has a meeting called  coming up in \d+ minutes/i);
    expect(asciiArt).toBeInTheDocument();
  });

  it('handles API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API error'))
    );

    render(<MonalisaMessage messageData={messageData} />);
    const asciiArt = await screen.findByText(/API error/i);
    expect(asciiArt).toBeInTheDocument();
  });
});
