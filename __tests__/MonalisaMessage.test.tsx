import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import MonalisaMessage from '../components/MonalisaMessage';
import { Meeting } from '../types/meeting';

global.fetch = jest.fn().mockResolvedValue({
  text: async () => '   /\\_/\\\n  ( o.o )  ',
});

const meeting: Meeting = {
  who: 'Devin',
  meetingTitle: 'Standup',
  meetingDate: '2030-01-01',
  meetingTime: '10:00',
  meetingUrl: 'https://example.com',
};

describe('MonalisaMessage', () => {
  it('renders without crashing with messageData', async () => {
    await act(async () => {
      render(<MonalisaMessage messageData={meeting} />);
    });
  });

  it('renders without crashing when no messageData is provided', () => {
    render(<MonalisaMessage />);
  });
});
