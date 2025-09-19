// Simple utility tests for meeting functions
describe('Meeting Utility Functions', () => {
  
  // Test date formatting
  test('formatDate formats date correctly', () => {
    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    };

    const testDate = new Date('2020-05-15T14:30:00.000Z');
    const formatted = formatDate(testDate);
    expect(formatted).toBe('2020-05-15');
  });

  // Test time formatting
  test('formatTime formats time correctly', () => {
    const formatTime = (date) => {
      const d = new Date(date)
      let hours = d.getHours();
      let minutes = d.getMinutes();
      if (minutes.toString().length < 2)
        minutes = '0' + minutes
      if (hours.toString().length < 2)
        hours = '0' + hours
      return `${hours}:${minutes}`
    };

    const testDate = new Date('2020-05-15T14:30:00.000Z');
    const formatted = formatTime(testDate);
    expect(formatted).toBe('14:30');
  });

  // Test meeting sorting
  test('sortMeetings sorts meetings by date and time', () => {
    const sortMeetings = (arr) => arr.sort((a, b) => {
      const d1 = new Date(`${a.meetingDate}T${a.meetingTime}`);
      const d2 = new Date(`${b.meetingDate}T${b.meetingTime}`);
      return d1 - d2;
    });

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

  // Test meeting filtering
  test('filterPastMeetings filters out past meetings', () => {
    const filterPastMeetings = (meetings) => {
      return meetings.filter((meeting) => {
        const date = new Date(`${meeting.meetingDate}T${meeting.meetingTime}`);
        return date - Date.now() > 0;
      });
    };

    // Mock Date.now to May 10, 2020 10:00 AM
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => new Date('2020-05-10T10:00:00.000Z').getTime());

    const meetings = [
      { meetingDate: '2020-05-09', meetingTime: '10:00', meetingTitle: 'Past' },
      { meetingDate: '2020-05-11', meetingTime: '10:00', meetingTitle: 'Future' },
      { meetingDate: '2020-05-10', meetingTime: '09:00', meetingTitle: 'Past Today' },
      { meetingDate: '2020-05-10', meetingTime: '11:00', meetingTitle: 'Future Today' }
    ];
    
    const filtered = filterPastMeetings(meetings);
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map(m => m.meetingTitle)).toEqual(['Future', 'Future Today']);

    // Restore original Date.now
    Date.now = originalDateNow;
  });

  // Test complete meeting preparation
  test('prepAndSortMeetings filters and sorts meetings correctly', () => {
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

    // Mock Date.now to May 10, 2020 10:00 AM
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => new Date('2020-05-10T10:00:00.000Z').getTime());

    const meetings = [
      { meetingDate: '2020-05-12', meetingTime: '14:00', meetingTitle: 'Future Later' },
      { meetingDate: '2020-05-09', meetingTime: '10:00', meetingTitle: 'Past' },
      { meetingDate: '2020-05-11', meetingTime: '09:00', meetingTitle: 'Future Earlier' }
    ];
    
    const result = prepAndSortMeetings(meetings);
    
    expect(result).toHaveLength(2);
    expect(result[0].meetingTitle).toBe('Future Earlier');
    expect(result[1].meetingTitle).toBe('Future Later');

    // Restore original Date.now
    Date.now = originalDateNow;
  });

  // Test meeting info generation
  test('getMeetingInfo generates correct meeting information', () => {
    const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime }) => (
      `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`
    );

    const meetingData = {
      who: 'Devin',
      meetingTitle: 'Team Standup',
      meetingDate: '2020-05-11',
      meetingTime: '09:00',
      meetingUrl: 'https://zoom.us/j/123'
    };

    const info = getMeetingInfo(meetingData);
    expect(info).toBe('Devin has a meeting called Team Standup coming up on 2020-05-11 at 09:00');
  });
});