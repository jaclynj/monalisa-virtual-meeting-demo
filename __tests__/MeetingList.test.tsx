import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import MeetingsList from '../components/MeetingList';
import { Meeting } from '../types/meeting';

global.fetch = jest.fn().mockResolvedValue({
  text: async () => 'ascii art mock',
});

const meeting: Meeting = {
  who: 'Devin',
  meetingTitle: 'Show and Tell',
  meetingDate: '2030-05-10',
  meetingTime: '11:30',
  meetingUrl: 'https://example.com/meeting',
};

describe('MeetingsList', () => {
  it('renders meeting information', async () => {
    await act(async () => {
      render(<MeetingsList meetings={[meeting]} />);
    });
    expect(screen.getByText(/show and tell/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /meeting link/i })).toBeInTheDocument();
  });

  it('renders the meeting link with the correct href', async () => {
    await act(async () => {
      render(<MeetingsList meetings={[meeting]} />);
    });
    expect(screen.getByRole('link', { name: /meeting link/i })).toHaveAttribute(
      'href',
      'https://example.com/meeting'
    );
  });

  it('renders without crashing when meetings list is empty', () => {
    render(<MeetingsList meetings={[]} />);
  });
});
