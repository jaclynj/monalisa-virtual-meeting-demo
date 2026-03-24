import React, { useState } from 'react';
import { Meeting } from '../types/meeting';
import styles from '../styles/MeetingForm.module.css';

const formatDate = (date: number): string => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatTime = (date: number): string => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

interface MeetingFormProps {
  addMeeting: (meeting: Meeting) => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ addMeeting }) => {
  const now = Date.now();
  const [who, setWho] = useState<string>('Devin');
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingDate, setMeetingDate] = useState<string>(formatDate(now));
  const [meetingTime, setMeetingTime] = useState<string>(formatTime(now));
  const [meetingUrl, setMeetingUrl] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMeeting({ who, meetingTitle, meetingDate, meetingTime, meetingUrl });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
      <label className={styles.label}>
        Meeting Title:
        <input
          name="meetingTitle"
          type="text"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Who:
        <select name="who" value={who} onChange={(e) => setWho(e.target.value)}>
          <option value="Devin">Devin</option>
          <option value="Allison">Allison</option>
        </select>
      </label>
      <br />
      <label className={styles.label}>
        Meeting date:
        <input
          name="meetingDate"
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Meeting time:
        <input
          name="meetingTime"
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Meeting url:
        <input
          name="meetingUrl"
          type="text"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MeetingForm;
