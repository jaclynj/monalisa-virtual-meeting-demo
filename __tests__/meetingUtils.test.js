const { sortMeetings, filterPastMeetings, prepAndSortMeetings, getMeetingInfo } = require('../utils/meetingUtils');

// Mock Date.now() to have consistent tests
const MOCK_NOW = new Date('2020-05-10T10:00:00').getTime();
const originalDateNow = Date.now;

beforeEach(() => {
  Date.now = jest.fn(() => MOCK_NOW);
});

afterEach(() => {
  Date.now = originalDateNow;
});

describe('Meeting Utils', () => {
  describe('sortMeetings', () => {
    it('should sort meetings by date and time in ascending order', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Late Meeting' },
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Early Meeting' },
        { meetingDate: '2020-05-11', meetingTime: '11:30', meetingTitle: 'Middle Meeting' }
      ];

      const result = sortMeetings(meetings);

      expect(result).toEqual([
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Early Meeting' },
        { meetingDate: '2020-05-11', meetingTime: '11:30', meetingTitle: 'Middle Meeting' },
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Late Meeting' }
      ]);
    });

    it('should handle same date with different times', () => {
      const meetings = [
        { meetingDate: '2020-05-10', meetingTime: '15:00', meetingTitle: 'Afternoon' },
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Morning' },
        { meetingDate: '2020-05-10', meetingTime: '12:00', meetingTitle: 'Noon' }
      ];

      const result = sortMeetings(meetings);

      expect(result).toEqual([
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Morning' },
        { meetingDate: '2020-05-10', meetingTime: '12:00', meetingTitle: 'Noon' },
        { meetingDate: '2020-05-10', meetingTime: '15:00', meetingTitle: 'Afternoon' }
      ]);
    });

    it('should not mutate the original array', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Second' },
        { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'First' }
      ];
      const original = [...meetings];

      const result = sortMeetings(meetings);

      expect(meetings).toEqual(original);
    });
  });

  describe('filterPastMeetings', () => {
    it('should filter out past meetings', () => {
      const meetings = [
        { meetingDate: '2020-05-09', meetingTime: '14:00', meetingTitle: 'Past Meeting' },
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Meeting' },
        { meetingDate: '2020-05-08', meetingTime: '09:00', meetingTitle: 'Another Past Meeting' }
      ];

      const result = filterPastMeetings(meetings);

      expect(result).toEqual([
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Meeting' }
      ]);
    });

    it('should include meetings happening exactly now', () => {
      const meetings = [
        { meetingDate: '2020-05-10', meetingTime: '10:00', meetingTitle: 'Current Meeting' }
      ];

      const result = filterPastMeetings(meetings);

      expect(result).toEqual([]);
    });

    it('should keep all future meetings', () => {
      const meetings = [
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Later Today' },
        { meetingDate: '2020-05-11', meetingTime: '09:00', meetingTitle: 'Tomorrow' },
        { meetingDate: '2020-05-15', meetingTime: '14:00', meetingTitle: 'Next Week' }
      ];

      const result = filterPastMeetings(meetings);

      expect(result).toEqual(meetings);
    });

    it('should return empty array when all meetings are past', () => {
      const meetings = [
        { meetingDate: '2020-05-09', meetingTime: '14:00', meetingTitle: 'Yesterday' },
        { meetingDate: '2020-05-08', meetingTime: '09:00', meetingTitle: 'Day Before' }
      ];

      const result = filterPastMeetings(meetings);

      expect(result).toEqual([]);
    });
  });

  describe('prepAndSortMeetings', () => {
    it('should filter past meetings and sort the remaining ones', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Future Late' },
        { meetingDate: '2020-05-09', meetingTime: '11:00', meetingTitle: 'Past' },
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Early' },
        { meetingDate: '2020-05-08', meetingTime: '09:00', meetingTitle: 'Another Past' }
      ];

      const result = prepAndSortMeetings(meetings);

      expect(result).toEqual([
        { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Early' },
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Future Late' }
      ]);
    });

    it('should not mutate the original array', () => {
      const meetings = [
        { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Future' },
        { meetingDate: '2020-05-09', meetingTime: '11:00', meetingTitle: 'Past' }
      ];
      const original = [...meetings];

      const result = prepAndSortMeetings(meetings);

      expect(meetings).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = prepAndSortMeetings([]);
      expect(result).toEqual([]);
    });
  });

  describe('getMeetingInfo', () => {
    it('should generate correct meeting info string', () => {
      const meeting = {
        who: 'Devin',
        meetingTitle: 'Show and Tell',
        meetingDate: '2020-05-10',
        meetingTime: '11:30',
        meetingUrl: 'https://github.zoom.us/j/116469253'
      };

      const result = getMeetingInfo(meeting);

      expect(result).toBe('Devin has a meeting called Show and Tell coming up on 2020-05-10 at 11:30');
    });

    it('should handle different person names', () => {
      const meeting = {
        who: 'Allison',
        meetingTitle: 'Code Review',
        meetingDate: '2020-05-11',
        meetingTime: '14:00',
        meetingUrl: 'https://example.com/meeting'
      };

      const result = getMeetingInfo(meeting);

      expect(result).toBe('Allison has a meeting called Code Review coming up on 2020-05-11 at 14:00');
    });

    it('should handle special characters in meeting title', () => {
      const meeting = {
        who: 'Devin',
        meetingTitle: 'Q&A Session: "Best Practices"',
        meetingDate: '2020-05-12',
        meetingTime: '09:15',
        meetingUrl: 'https://example.com'
      };

      const result = getMeetingInfo(meeting);

      expect(result).toBe('Devin has a meeting called Q&A Session: "Best Practices" coming up on 2020-05-12 at 09:15');
    });
  });
});