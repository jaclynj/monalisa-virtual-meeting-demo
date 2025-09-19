import React from 'react';
import { render, screen } from '@testing-library/react';
import { MeetingsList } from '../components/MeetingList';

// Mock MonalisaMessage component since it has external API dependencies
jest.mock('../components/MonalisaMessage', () => {
  return function MockMonalisaMessage({ messageData }) {
    return <div data-testid="monalisa-message">Mocked message for {messageData?.who}</div>;
  };
});

describe('MeetingsList', () => {
  const mockMeetings = [
    {
      who: 'Devin',
      meetingTitle: 'Team Standup',
      meetingDate: '2020-05-11',
      meetingTime: '09:00',
      meetingUrl: 'https://zoom.us/j/123'
    },
    {
      who: 'Allison',
      meetingTitle: 'Project Review',
      meetingDate: '2020-05-12',
      meetingTime: '14:00',
      meetingUrl: 'https://zoom.us/j/456'
    }
  ];

  test('renders meetings list correctly', () => {
    render(<MeetingsList meetings={mockMeetings} />);
    
    expect(screen.getByText(/Devin has a meeting called Team Standup/)).toBeInTheDocument();
    expect(screen.getByText(/Allison has a meeting called Project Review/)).toBeInTheDocument();
  });

  test('renders meeting links', () => {
    render(<MeetingsList meetings={mockMeetings} />);
    
    const links = screen.getAllByText('Meeting Link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://zoom.us/j/123');
    expect(links[1]).toHaveAttribute('href', 'https://zoom.us/j/456');
  });

  test('renders MonalisaMessage component', () => {
    render(<MeetingsList meetings={mockMeetings} />);
    
    expect(screen.getByTestId('monalisa-message')).toBeInTheDocument();
    expect(screen.getByText('Mocked message for Devin')).toBeInTheDocument();
  });

  test('handles empty meetings array', () => {
    render(<MeetingsList meetings={[]} />);
    
    // Should not crash and should render basic structure
    expect(screen.queryByText('Meeting Link')).not.toBeInTheDocument();
  });
});