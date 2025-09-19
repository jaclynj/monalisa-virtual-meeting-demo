// Test utilities for meeting functions
import { formatDate, formatTime } from '../components/MeetingForm';

// Extract the utility functions from index.js for testing
const sortMeetings = (arr) => arr.sort((a, b) => {
  const d1 = new Date(`${a.meetingDate}T${a.meetingTime}`);
  const d2 = new Date(`${b.meetingDate}T${b.meetingTime}`);
  return d1 - d2;
});

const filterPastMeetings = (meetings) => {
  return meetings.filter((meeting) => {
    const date = new Date(`${meeting.meetingDate}T${meeting.meetingTime}`);
    return date - Date.now() > 0;
  });
};

const prepAndSortMeetings = (meetings) => {
  let result = [...meetings];
  result = filterPastMeetings(result);
  result = sortMeetings(result);
  return result;
};

describe('Meeting Utility Functions', () => {
  beforeEach(() => {
    // Mock Date.now to May 10, 2020 10:00 AM
    const mockDate = new Date('2020-05-10T10:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    Date.now = jest.fn(() => mockDate.getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const testDate = new Date('2020-05-15T14:30:00.000Z');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2020-05-15');
    });

    test('pads single digit months and days', () => {
      const testDate = new Date('2020-01-05T14:30:00.000Z');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2020-01-05');
    });
  });

  describe('formatTime', () => {
    test('formats time correctly', () => {
      const testDate = new Date('2020-05-15T14:30:00.000Z');
      const formatted = formatTime(testDate);
      expect(formatted).toBe('14:30');
    });

    test('pads single digit hours and minutes', () => {
      const testDate = new Date('2020-05-15T09:05:00.000Z');
      const formatted = formatTime(testDate);
      expect(formatted).toBe('09:05');
    });
  });

  describe('sortMeetings', () => {
    test('sorts meetings by date and time', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Later' },
        { meetingDate: '2020-05-11', meetingTime: '09:00', meetingTitle: 'Earlier' },
        { meetingDate: '2020-05-11', meetingTime: '15:00', meetingTitle: 'Middle' }
      ];
      
      const sorted = sortMeetings(meetings);
      
      expect(sorted[0].meetingTitle).toBe('Earlier');
      expect(sorted[1].meetingTitle).toBe('Middle');
      expect(sorted[2].meetingTitle).toBe('Later');
    });
  });

  describe('filterPastMeetings', () => {
    test('filters out past meetings', () => {
      const meetings = [
        { meetingDate: '2020-05-09', meetingTime: '10:00', meetingTitle: 'Past' },
        { meetingDate: '2020-05-11', meetingTime: '10:00', meetingTitle: 'Future' },
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Past Today' },
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Today' }
      ];
      
      const filtered = filterPastMeetings(meetings);
      
      expect(filtered).toHaveLength(2);
      expect(filtered.map(m => m.meetingTitle)).toEqual(['Future', 'Future Today']);
    });
  });

  describe('prepAndSortMeetings', () => {
    test('filters and sorts meetings correctly', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Future Later' },
        { meetingDate: '2020-05-09', meetingTime: '10:00', meetingTitle: 'Past' },
        { meetingDate: '2020-05-11', meetingTime: '09:00', meetingTitle: 'Future Earlier' }
      ];
      
      const result = prepAndSortMeetings(meetings);
      
      expect(result).toHaveLength(2);
      expect(result[0].meetingTitle).toBe('Future Earlier');
      expect(result[1].meetingTitle).toBe('Future Later');
    });
  });
});