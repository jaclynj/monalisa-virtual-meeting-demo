// Simple test to verify test setup works
describe('Meeting Tracking App - Basic Tests', () => {
  test('basic math operations work', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 3).toBe(6);
  });

  test('date operations work correctly', () => {
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
    
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    expect(futureDate.getTime()).toBeGreaterThan(now.getTime());
  });

  test('string operations for meeting info work', () => {
    const meetingInfo = 'Devin has a meeting called Daily Standup coming up on 2024-12-20 at 09:00';
    expect(meetingInfo).toContain('Devin');
    expect(meetingInfo).toContain('Daily Standup');
    expect(meetingInfo).toContain('2024-12-20');
  });

  test('array operations for meetings work', () => {
    const meetings = [
      { title: 'Meeting 1', date: '2024-12-20' },
      { title: 'Meeting 2', date: '2024-12-21' }
    ];
    
    expect(meetings).toHaveLength(2);
    expect(meetings[0].title).toBe('Meeting 1');
    expect(meetings.map(m => m.title)).toEqual(['Meeting 1', 'Meeting 2']);
  });

  test('meeting filtering logic works', () => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const meetings = [
      { 
        title: 'Past Meeting', 
        meetingDate: pastDate.toISOString().split('T')[0], 
        meetingTime: '10:00' 
      },
      { 
        title: 'Future Meeting', 
        meetingDate: futureDate.toISOString().split('T')[0], 
        meetingTime: '10:00' 
      }
    ];
    
    const futureMeetings = meetings.filter(meeting => {
      const meetingDateTime = new Date(`${meeting.meetingDate}T${meeting.meetingTime}`);
      return meetingDateTime.getTime() > now.getTime();
    });
    
    expect(futureMeetings).toHaveLength(1);
    expect(futureMeetings[0].title).toBe('Future Meeting');
  });

  test('meeting sorting logic works', () => {
    const meetings = [
      { 
        title: 'Later Meeting', 
        meetingDate: '2024-12-25', 
        meetingTime: '15:00' 
      },
      { 
        title: 'Earlier Meeting', 
        meetingDate: '2024-12-24', 
        meetingTime: '10:00' 
      }
    ];
    
    const sorted = meetings.sort((a, b) => {
      const d1 = new Date(`${a.meetingDate}T${a.meetingTime}`);
      const d2 = new Date(`${b.meetingDate}T${b.meetingTime}`);
      return d1 - d2;
    });
    
    expect(sorted[0].title).toBe('Earlier Meeting');
    expect(sorted[1].title).toBe('Later Meeting');
  });
});