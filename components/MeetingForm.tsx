import React, { useState } from "react";
import { Meeting } from "../types/meeting";
import styles from "./MeetingForm.module.css";

interface Props {
  addMeeting: (meeting: Meeting) => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

interface FormErrors {
  title?: string;
  dateTime?: string;
}

export function MeetingForm({ addMeeting }: Props) {
  const [who, setWho] = useState("Devin");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState(() => formatDate(new Date()));
  const [meetingTime, setMeetingTime] = useState(() => formatTime(new Date()));
  const [meetingUrl, setMeetingUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!meetingTitle.trim()) {
      newErrors.title = "Meeting title is required.";
    }
    const dt = new Date(`${meetingDate}T${meetingTime}`);
    if (dt <= new Date()) {
      newErrors.dateTime = "Meeting must be scheduled in the future.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addMeeting({
      id: crypto.randomUUID(),
      who,
      meetingTitle,
      meetingDate,
      meetingTime,
      meetingUrl,
    });
    setMeetingTitle("");
    setMeetingUrl("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.field}>
        Meeting Title:
        <input
          name="meetingTitle"
          type="text"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title}</span>
        )}
      </label>
      <label className={styles.field}>
        Who:
        <input
          name="who"
          type="text"
          value={who}
          onChange={(e) => setWho(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        Meeting date:
        <input
          name="meetingDate"
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        Meeting time:
        <input
          name="meetingTime"
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />
        {errors.dateTime && (
          <span className={styles.error}>{errors.dateTime}</span>
        )}
      </label>
      <label className={styles.field}>
        Meeting URL:
        <input
          name="meetingUrl"
          type="text"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
        />
      </label>
      <input type="submit" value="Add Meeting" />
    </form>
  );
}

export default MeetingForm;
