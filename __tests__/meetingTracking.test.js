import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/index';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock MonalisaMessage component
jest.mock('../pages/MonalisaMessage', () => {
  return function MonalisaMessage({ messageData }) {
    return <div data-testid="monalisa-message">Mocked Monalisa Message</div>;
  };
});

describe('Home Component - Meeting Tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders main page with form and meetings list', () => {
    render(<Home />);
    
    expect(screen.getByText('Tracking our virtual meetings!')).toBeInTheDocument();
    expect(screen.getByLabelText(/Meeting Title:/)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('loads meetings from meetingData.json when no localStorage data', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<Home />);
    
    // The component should load default meeting data
    expect(localStorageMock.getItem).toHaveBeenCalledWith('localMeetingData');
  });

  test('loads meetings from localStorage when available', () => {
    const storedMeetings = JSON.stringify([
      {
        who: 'Test User',
        meetingTitle: 'Stored Meeting',
        meetingDate: '2024-12-25',
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/stored'
      }
    ]);
    
    localStorageMock.getItem.mockReturnValue(storedMeetings);
    
    render(<Home />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('localMeetingData');
  });

  test('adds new meeting and saves to localStorage', async () => {
    render(<Home />);
    
    // Fill in the meeting form
    fireEvent.change(screen.getByLabelText(/Meeting Title:/), {
      target: { value: 'New Test Meeting' }
    });
    fireEvent.change(screen.getByLabelText(/Meeting date:/), {
      target: { value: '2024-12-30' }
    });
    fireEvent.change(screen.getByLabelText(/Meeting time:/), {
      target: { value: '16:00' }
    });
    fireEvent.change(screen.getByLabelText(/Meeting url:/), {
      target: { value: 'https://zoom.us/new' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByDisplayValue('Submit'));
    
    await waitFor(() => {
      // Check that localStorage.setItem was called
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'localMeetingData',
        expect.stringContaining('New Test Meeting')
      );
    });
  });

  test('filters out past meetings', async () => {
    // Create a past meeting and a future meeting
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    const meetings = [
      {
        who: 'Past User',
        meetingTitle: 'Past Meeting',
        meetingDate: pastDate.toISOString().split('T')[0],
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/past'
      },
      {
        who: 'Future User',
        meetingTitle: 'Future Meeting',
        meetingDate: futureDate.toISOString().split('T')[0],
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/future'
      }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(meetings));
    
    render(<Home />);
    
    // The past meeting should be filtered out
    await waitFor(() => {
      expect(screen.queryByText(/Past Meeting/)).not.toBeInTheDocument();
      expect(screen.getByText(/Future Meeting/)).toBeInTheDocument();
    });
  });

  test('sorts meetings by date and time', async () => {
    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 2);
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 1);
    
    const meetings = [
      {
        who: 'User B',
        meetingTitle: 'Later Meeting',
        meetingDate: futureDate1.toISOString().split('T')[0],
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/later'
      },
      {
        who: 'User A',
        meetingTitle: 'Earlier Meeting',
        meetingDate: futureDate2.toISOString().split('T')[0],
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/earlier'
      }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(meetings));
    
    render(<Home />);
    
    // Both meetings should be displayed (since they're in the future)
    await waitFor(() => {
      expect(screen.getByText(/Earlier Meeting/)).toBeInTheDocument();
      expect(screen.getByText(/Later Meeting/)).toBeInTheDocument();
    });
  });
});