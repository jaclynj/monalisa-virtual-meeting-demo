import { getMeetings, addMeeting } from '../../lib/db';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const meetings = getMeetings();
      return res.status(200).json(meetings);
    } catch (err) {
      console.error('Failed to fetch meetings:', err);
      return res.status(500).json({ error: 'Failed to fetch meetings.' });
    }
  }

  if (req.method === 'POST') {
    const { who, meetingTitle, meetingDate, meetingTime, meetingUrl } = req.body || {};

    if (!who || !meetingTitle || !meetingDate || !meetingTime || !meetingUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!ISO_DATE_RE.test(meetingDate)) {
      return res.status(400).json({ error: 'meetingDate must be in YYYY-MM-DD format.' });
    }

    if (!TIME_RE.test(meetingTime)) {
      return res.status(400).json({ error: 'meetingTime must be in HH:MM format.' });
    }

    if (!isValidUrl(meetingUrl)) {
      return res.status(400).json({ error: 'meetingUrl must be a valid URL.' });
    }

    try {
      const meeting = addMeeting({ who, meetingTitle, meetingDate, meetingTime, meetingUrl });
      return res.status(201).json(meeting);
    } catch (err) {
      console.error('Failed to add meeting:', err);
      return res.status(500).json({ error: 'Failed to add meeting.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
