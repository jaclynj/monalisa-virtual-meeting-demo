/**
 * Integration tests for meeting tracking functionality
 * These tests verify that the core business logic works end-to-end
 */

const { sortMeetings, filterPastMeetings, prepAndSortMeetings, getMeetingInfo } = require('../utils/meetingUtils');
const { formatDate, formatTime } = require('../utils/dateUtils');

// Mock current time to be 2020-05-10T10:00:00
const MOCK_NOW = new Date('2020-05-10T10:00:00').getTime();
const originalDateNow = Date.now;

beforeEach(() => {
  Date.now = jest.fn(() => MOCK_NOW);
});

afterEach(() => {
  Date.now = originalDateNow;
});

describe('Meeting Tracking Integration', () => {
  describe('Complete meeting workflow', () => {
    it('should handle a realistic meeting scenario', () => {
      // Simulate a mix of past and future meetings
      const inputMeetings = [
        {
          who: 'Devin',
          meetingTitle: 'Daily Standup',
          meetingDate: '2020-05-09', // Past
          meetingTime: '09:00',
          meetingUrl: 'https://zoom.us/j/123'
        },
        {
          who: 'Allison',
          meetingTitle: 'Sprint Planning',
          meetingDate: '2020-05-11', // Future
          meetingTime: '14:00',
          meetingUrl: 'https://zoom.us/j/456'
        },
        {
          who: 'Devin',
          meetingTitle: 'Code Review',
          meetingDate: '2020-05-10', // Future - same day but later
          meetingTime: '15:30',
          meetingUrl: 'https://zoom.us/j/789'
        },
        {
          who: 'Allison',
          meetingTitle: 'Team Sync',
          meetingDate: '2020-05-08', // Past
          meetingTime: '11:00',
          meetingUrl: 'https://zoom.us/j/101'
        }
      ];

      // Process meetings like the app would
      const processedMeetings = prepAndSortMeetings(inputMeetings);

      // Should filter out past meetings and sort by date/time
      expect(processedMeetings).toEqual([
        {
          who: 'Devin',
          meetingTitle: 'Code Review',
          meetingDate: '2020-05-10',
          meetingTime: '15:30',
          meetingUrl: 'https://zoom.us/j/789'
        },
        {
          who: 'Allison',
          meetingTitle: 'Sprint Planning',
          meetingDate: '2020-05-11',
          meetingTime: '14:00',
          meetingUrl: 'https://zoom.us/j/456'
        }
      ]);
    });

    it('should generate correct meeting info for display', () => {
      const meeting = {
        who: 'Devin',
        meetingTitle: 'Project Demo',
        meetingDate: '2020-05-12',
        meetingTime: '16:00',
        meetingUrl: 'https://zoom.us/j/555'
      };

      const meetingInfo = getMeetingInfo(meeting);
      
      expect(meetingInfo).toBe('Devin has a meeting called Project Demo coming up on 2020-05-12 at 16:00');
    });

    it('should handle empty meeting lists gracefully', () => {
      const result = prepAndSortMeetings([]);
      expect(result).toEqual([]);
    });

    it('should handle all past meetings', () => {
      const allPastMeetings = [
        {
          who: 'Devin',
          meetingTitle: 'Old Meeting 1',
          meetingDate: '2020-05-08',
          meetingTime: '09:00',
          meetingUrl: 'https://zoom.us/j/123'
        },
        {
          who: 'Allison', 
          meetingTitle: 'Old Meeting 2',
          meetingDate: '2020-05-09',
          meetingTime: '14:00',
          meetingUrl: 'https://zoom.us/j/456'
        }
      ];

      const result = prepAndSortMeetings(allPastMeetings);
      expect(result).toEqual([]);
    });
  });

  describe('Form data formatting', () => {
    it('should format dates and times for form inputs correctly', () => {
      const testDate = new Date('2020-05-10T14:30:45.123Z');
      
      const formattedDate = formatDate(testDate);
      const formattedTime = formatTime(testDate);
      
      expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(formattedTime).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should handle current timestamp for default form values', () => {
      const now = Date.now();
      
      const formattedDate = formatDate(now);
      const formattedTime = formatTime(now);
      
      expect(formattedDate).toBe('2020-05-10');
      expect(formattedTime).toBe('10:00');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle meetings exactly at the current time', () => {
      const meetingsAtCurrentTime = [
        {
          who: 'Devin',
          meetingTitle: 'Current Meeting',
          meetingDate: '2020-05-10',
          meetingTime: '10:00', // Exactly current time
          meetingUrl: 'https://zoom.us/j/current'
        }
      ];

      const result = filterPastMeetings(meetingsAtCurrentTime);
      expect(result).toEqual([]); // Should be filtered out
    });

    it('should handle meetings 1 minute in the future', () => {
      const futureByOneMinute = [
        {
          who: 'Devin', 
          meetingTitle: 'Very Soon Meeting',
          meetingDate: '2020-05-10',
          meetingTime: '10:01', // 1 minute in future
          meetingUrl: 'https://zoom.us/j/soon'
        }
      ];

      const result = filterPastMeetings(futureByOneMinute);
      expect(result).toEqual(futureByOneMinute); // Should be kept
    });

    it('should handle invalid meeting data gracefully', () => {
      const meetingsWithMissingFields = [
        {
          who: 'Devin',
          meetingTitle: 'Incomplete Meeting',
          // Missing date and time
          meetingUrl: 'https://zoom.us/j/incomplete'
        }
      ];

      // Should not throw an error
      expect(() => {
        prepAndSortMeetings(meetingsWithMissingFields);
      }).not.toThrow();
    });

    it('should handle special characters in meeting titles', () => {
      const meetingWithSpecialChars = {
        who: 'Allison',
        meetingTitle: 'Q&A: "How to Code?" & Other Questions',
        meetingDate: '2020-05-11',
        meetingTime: '15:00',
        meetingUrl: 'https://zoom.us/j/special'
      };

      const meetingInfo = getMeetingInfo(meetingWithSpecialChars);
      expect(meetingInfo).toContain('Q&A: "How to Code?" & Other Questions');
    });
  });

  describe('Meeting sorting edge cases', () => {
    it('should handle same date and time meetings consistently', () => {
      const sameDateTimeMeetings = [
        {
          who: 'Devin',
          meetingTitle: 'Meeting A',
          meetingDate: '2020-05-11',
          meetingTime: '14:00',
          meetingUrl: 'https://zoom.us/j/a'
        },
        {
          who: 'Allison',
          meetingTitle: 'Meeting B', 
          meetingDate: '2020-05-11',
          meetingTime: '14:00',
          meetingUrl: 'https://zoom.us/j/b'
        }
      ];

      const result = sortMeetings(sameDateTimeMeetings);
      
      // Should maintain stable sort order
      expect(result).toHaveLength(2);
      expect(result[0].meetingTitle).toBe('Meeting A');
      expect(result[1].meetingTitle).toBe('Meeting B');
    });

    it('should handle cross-day sorting correctly', () => {
      const crossDayMeetings = [
        {
          who: 'Devin',
          meetingTitle: 'Late Night',
          meetingDate: '2020-05-10',
          meetingTime: '23:59',
          meetingUrl: 'https://zoom.us/j/late'
        },
        {
          who: 'Allison',
          meetingTitle: 'Early Morning',
          meetingDate: '2020-05-11',
          meetingTime: '00:01',
          meetingUrl: 'https://zoom.us/j/early'
        }
      ];

      const result = sortMeetings(crossDayMeetings);
      
      expect(result[0].meetingTitle).toBe('Late Night');
      expect(result[1].meetingTitle).toBe('Early Morning');
    });
  });
});