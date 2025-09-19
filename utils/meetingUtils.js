// Meeting utility functions

const sortMeetings = (arr) => [...arr].sort((a, b) => {
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

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime, meetingUrl }) => (
  `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`
);

module.exports = {
  sortMeetings,
  filterPastMeetings,
  prepAndSortMeetings,
  getMeetingInfo
};