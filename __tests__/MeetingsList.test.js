const React = require('react');
const { render, screen } = require('@testing-library/react');

// Mock MonalisaMessage component since it makes external API calls
jest.mock('../pages/MonalisaMessage', () => {
  return function MonalisaMessage({ messageData }) {
    return React.createElement('div', { 'data-testid': 'monalisa-message' }, 'Mocked Monalisa Message');
  };
});

const { MeetingsList } = require('../pages/MeetingList');

describe('MeetingsList Component', () => {
  const mockMeetings = [
    {
      who: 'Devin',
      meetingTitle: 'Daily Standup',
      meetingDate: '2024-12-20',
      meetingTime: '09:00',
      meetingUrl: 'https://zoom.us/j/123456789'
    },
    {
      who: 'Allison',
      meetingTitle: 'Sprint Planning',
      meetingDate: '2024-12-21',
      meetingTime: '14:00',
      meetingUrl: 'https://zoom.us/j/987654321'
    }
  ];

  test('renders empty meetings list without crashing', () => {
    render(React.createElement(MeetingsList, { meetings: [] }));
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('renders meetings list with provided meetings', () => {
    render(React.createElement(MeetingsList, { meetings: mockMeetings }));
    
    // Check that table is rendered
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Check that meeting information is displayed
    expect(screen.getByText(/Devin has a meeting called Daily Standup/)).toBeInTheDocument();
    expect(screen.getByText(/Allison has a meeting called Sprint Planning/)).toBeInTheDocument();
    
    // Check that meeting links are present
    const meetingLinks = screen.getAllByText('Meeting Link');
    expect(meetingLinks).toHaveLength(2);
    expect(meetingLinks[0]).toHaveAttribute('href', 'https://zoom.us/j/123456789');
    expect(meetingLinks[1]).toHaveAttribute('href', 'https://zoom.us/j/987654321');
  });

  test('renders MonalisaMessage when meetings are provided', () => {
    render(React.createElement(MeetingsList, { meetings: mockMeetings }));
    expect(screen.getByTestId('monalisa-message')).toBeInTheDocument();
  });

  test('does not render MonalisaMessage when no meetings provided', () => {
    render(React.createElement(MeetingsList, { meetings: [] }));
    expect(screen.queryByTestId('monalisa-message')).not.toBeInTheDocument();
  });

  test('handles meetings without all properties gracefully', () => {
    const incompleteMeetings = [
      {
        who: 'Test User',
        meetingTitle: 'Test Meeting',
        // Missing meetingDate, meetingTime, meetingUrl
      }
    ];
    
    expect(() => {
      render(React.createElement(MeetingsList, { meetings: incompleteMeetings }));
    }).not.toThrow();
  });
});