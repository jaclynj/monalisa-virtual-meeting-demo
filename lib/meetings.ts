import { Meeting } from '../types/meeting';

export const sortMeetings = (arr: Meeting[]): Meeting[] =>
  [...arr].sort((a, b) => {
    const d1 = new Date(`${a.meetingDate}T${a.meetingTime}`);
    const d2 = new Date(`${b.meetingDate}T${b.meetingTime}`);
    return d1.getTime() - d2.getTime();
  });

export const filterPastMeetings = (meetings: Meeting[]): Meeting[] =>
  meetings.filter((meeting) => {
    const date = new Date(`${meeting.meetingDate}T${meeting.meetingTime}`);
    return date.getTime() > Date.now();
  });

export const prepAndSortMeetings = (meetings: Meeting[]): Meeting[] => {
  const filtered = filterPastMeetings(meetings);
  return sortMeetings(filtered);
};

export const getMonaMessage = ({
  who,
  meetingTitle,
  meetingDate,
  meetingTime,
}: Pick<Meeting, 'who' | 'meetingTitle' | 'meetingDate' | 'meetingTime'>): string => {
  const ms = Math.abs(
    new Date(`${meetingDate}T${meetingTime}`).getTime() - Date.now()
  );
  const minutesToGo = Math.floor(ms / 60000);
  const when =
    minutesToGo > 59
      ? `${Math.floor(minutesToGo / 60)} hours`
      : `${minutesToGo} minutes`;
  return `${who} has a meeting called ${meetingTitle} coming up in ${when}`;
};
