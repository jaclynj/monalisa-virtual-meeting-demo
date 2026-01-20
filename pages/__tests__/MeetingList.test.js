import React from 'react';
import { render, screen } from '@testing-library/react';
import { MeetingsList } from '../MeetingList';

describe('MeetingsList', () => {
  const meetings = [
    {
      who: 'Devin',
      meetingTitle: 'Show and Tell',
      meetingDate: '2020-05-10',
      meetingTime: '11:30',
      meetingUrl: 'https://github.zoom.us/j/116469253'
    },
    {
      who: 'Allison',
      meetingTitle: 'Team Sync',
      meetingDate: '2020-05-11',
      meetingTime: '14:00',
      meetingUrl: 'https://github.zoom.us/j/116469254'
    }
  ];

  it('renders the meetings list', () => {
    render(<MeetingsList meetings={meetings} />);
    const meetingItems = screen.getAllByRole('row');
    expect(meetingItems).toHaveLength(meetings.length);
  });

  it('renders the meeting information correctly', () => {
    render(<MeetingsList meetings={meetings} />);
    const firstMeeting = screen.getByText(/Devin has a meeting called Show and Tell coming up on 2020-05-10 at 11:30/i);
    const secondMeeting = screen.getByText(/Allison has a meeting called Team Sync coming up on 2020-05-11 at 14:00/i);
    expect(firstMeeting).toBeInTheDocument();
    expect(secondMeeting).toBeInTheDocument();
  });

  it('renders the meeting links correctly', () => {
    render(<MeetingsList meetings={meetings} />);
    const firstMeetingLink = screen.getByText(/Meeting Link/i).closest('a');
    const secondMeetingLink = screen.getByText(/Meeting Link/i).closest('a');
    expect(firstMeetingLink).toHaveAttribute('href', 'https://github.zoom.us/j/116469253');
    expect(secondMeetingLink).toHaveAttribute('href', 'https://github.zoom.us/j/116469254');
  });
});
