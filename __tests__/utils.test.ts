import '@testing-library/jest-dom';
import {
  sortMeetings,
  filterPastMeetings,
  prepAndSortMeetings,
  getMonaMessage,
} from '../lib/meetings';
import { Meeting } from '../types/meeting';

const makeMeeting = (overrides: Partial<Meeting> = {}): Meeting => ({
  who: 'Devin',
  meetingTitle: 'Test Meeting',
  meetingDate: '2030-01-01',
  meetingTime: '10:00',
  meetingUrl: 'https://example.com',
  ...overrides,
});

describe('sortMeetings', () => {
  it('sorts meetings by date/time ascending', () => {
    const m1 = makeMeeting({ meetingDate: '2030-01-03', meetingTime: '10:00' });
    const m2 = makeMeeting({ meetingDate: '2030-01-01', meetingTime: '09:00' });
    const m3 = makeMeeting({ meetingDate: '2030-01-02', meetingTime: '15:00' });
    const result = sortMeetings([m1, m2, m3]);
    expect(result[0]).toBe(m2);
    expect(result[1]).toBe(m3);
    expect(result[2]).toBe(m1);
  });

  it('does not mutate the original array', () => {
    const meetings = [
      makeMeeting({ meetingDate: '2030-01-02' }),
      makeMeeting({ meetingDate: '2030-01-01' }),
    ];
    const original = [...meetings];
    sortMeetings(meetings);
    expect(meetings[0]).toBe(original[0]);
  });
});

describe('filterPastMeetings', () => {
  it('removes meetings in the past', () => {
    const past = makeMeeting({ meetingDate: '2020-01-01', meetingTime: '10:00' });
    const future = makeMeeting({ meetingDate: '2030-01-01', meetingTime: '10:00' });
    const result = filterPastMeetings([past, future]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(future);
  });

  it('keeps all meetings if all are in the future', () => {
    const meetings = [
      makeMeeting({ meetingDate: '2030-06-01' }),
      makeMeeting({ meetingDate: '2030-07-01' }),
    ];
    expect(filterPastMeetings(meetings)).toHaveLength(2);
  });

  it('returns empty array when all meetings are in the past', () => {
    const meetings = [makeMeeting({ meetingDate: '2020-01-01' })];
    expect(filterPastMeetings(meetings)).toHaveLength(0);
  });
});

describe('prepAndSortMeetings', () => {
  it('filters past meetings and sorts remaining by date ascending', () => {
    const past = makeMeeting({ meetingDate: '2020-01-01', meetingTime: '10:00' });
    const future1 = makeMeeting({ meetingDate: '2030-03-01', meetingTime: '10:00' });
    const future2 = makeMeeting({ meetingDate: '2030-01-01', meetingTime: '09:00' });
    const result = prepAndSortMeetings([past, future1, future2]);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(future2);
    expect(result[1]).toBe(future1);
  });
});

describe('getMonaMessage', () => {
  it('returns a message containing the who and meetingTitle', () => {
    const future = new Date(Date.now() + 30 * 60 * 1000);
    const meetingDate = future.toISOString().split('T')[0];
    const meetingTime = `${String(future.getHours()).padStart(2, '0')}:${String(future.getMinutes()).padStart(2, '0')}`;
    const msg = getMonaMessage({
      who: 'Devin',
      meetingTitle: 'Standup',
      meetingDate,
      meetingTime,
    });
    expect(msg).toContain('Devin');
    expect(msg).toContain('Standup');
  });

  it('says "minutes" when the meeting is under 60 minutes away', () => {
    const future = new Date(Date.now() + 30 * 60 * 1000);
    const meetingDate = future.toISOString().split('T')[0];
    const meetingTime = `${String(future.getHours()).padStart(2, '0')}:${String(future.getMinutes()).padStart(2, '0')}`;
    const msg = getMonaMessage({
      who: 'Devin',
      meetingTitle: 'Standup',
      meetingDate,
      meetingTime,
    });
    expect(msg).toContain('minutes');
  });

  it('says "hours" when the meeting is over 59 minutes away', () => {
    const future = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const meetingDate = future.toISOString().split('T')[0];
    const meetingTime = `${String(future.getHours()).padStart(2, '0')}:${String(future.getMinutes()).padStart(2, '0')}`;
    const msg = getMonaMessage({
      who: 'Allison',
      meetingTitle: 'Planning',
      meetingDate,
      meetingTime,
    });
    expect(msg).toContain('hours');
    expect(msg).toContain('Allison');
  });
});
