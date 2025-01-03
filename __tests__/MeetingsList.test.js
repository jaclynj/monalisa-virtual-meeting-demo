import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MeetingsList } from '../pages/MeetingList';

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

  test('renders MeetingsList component', () => {
    render(<MeetingsList meetings={meetings} />);
    const meetingElements = screen.getAllByText(/has a meeting called/i);
    expect(meetingElements.length).toBe(2);
  });

  test('renders meeting links', () => {
    render(<MeetingsList meetings={meetings} />);
    const meetingLinkElements = screen.getAllByText(/Meeting Link/i);
    expect(meetingLinkElements.length).toBe(2);
  });
});
