import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/index';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock the MonalisaMessage component
jest.mock('../components/MonalisaMessage', () => {
  return function MockMonalisaMessage() {
    return <div data-testid="monalisa-message">Mocked Monalisa Message</div>;
  };
});

describe('Home Page - Meeting Tracking', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    
    // Mock Date to ensure consistent testing
    const mockDate = new Date('2020-05-10T10:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    Date.now = jest.fn(() => mockDate.getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders page title and form', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    render(<Home />);
    
    expect(screen.getByText('Tracking our virtual meetings!')).toBeInTheDocument();
    expect(screen.getByLabelText(/meeting title/i)).toBeInTheDocument();
  });

  test('loads meetings from localStorage on mount', () => {
    const storedMeetings = JSON.stringify([
      {
        who: 'Devin',
        meetingTitle: 'Stored Meeting',
        meetingDate: '2020-05-11',
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/j/stored'
      }
    ]);
    
    mockLocalStorage.getItem.mockReturnValue(storedMeetings);
    render(<Home />);
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('localMeetingData');
    expect(screen.getByText(/Devin has a meeting called Stored Meeting/)).toBeInTheDocument();
  });

  test('adds new meeting when form is submitted', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    render(<Home />);
    
    const titleInput = screen.getByLabelText(/meeting title/i);
    const urlInput = screen.getByLabelText(/meeting url/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(titleInput, { target: { value: 'New Team Meeting' } });
    fireEvent.change(urlInput, { target: { value: 'https://zoom.us/j/newmeeting' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Devin has a meeting called New Team Meeting/)).toBeInTheDocument();
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  test('filters past meetings correctly', () => {
    // Past meeting should be filtered out
    const meetingsWithPast = JSON.stringify([
      {
        who: 'Devin',
        meetingTitle: 'Past Meeting',
        meetingDate: '2020-05-09', // Yesterday
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/j/past'
      },
      {
        who: 'Allison',
        meetingTitle: 'Future Meeting',
        meetingDate: '2020-05-11', // Tomorrow
        meetingTime: '10:00',
        meetingUrl: 'https://zoom.us/j/future'
      }
    ]);
    
    mockLocalStorage.getItem.mockReturnValue(meetingsWithPast);
    render(<Home />);
    
    // Should only show future meeting
    expect(screen.queryByText(/Past Meeting/)).not.toBeInTheDocument();
    expect(screen.getByText(/Future Meeting/)).toBeInTheDocument();
  });

  test('sorts meetings by date and time', () => {
    const unsortedMeetings = JSON.stringify([
      {
        who: 'Allison',
        meetingTitle: 'Later Meeting',
        meetingDate: '2020-05-12',
        meetingTime: '14:00',
        meetingUrl: 'https://zoom.us/j/later'
      },
      {
        who: 'Devin',
        meetingTitle: 'Earlier Meeting',
        meetingDate: '2020-05-11',
        meetingTime: '09:00',
        meetingUrl: 'https://zoom.us/j/earlier'
      }
    ]);
    
    mockLocalStorage.getItem.mockReturnValue(unsortedMeetings);
    render(<Home />);
    
    const meetingTexts = screen.getAllByText(/has a meeting called/);
    expect(meetingTexts[0]).toHaveTextContent('Earlier Meeting');
    expect(meetingTexts[1]).toHaveTextContent('Later Meeting');
  });
});