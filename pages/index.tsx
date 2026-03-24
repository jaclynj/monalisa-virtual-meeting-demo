import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Meeting } from "../types/meeting";
import { MeetingForm } from "../components/MeetingForm";
import { MeetingList } from "../components/MeetingList";
import styles from "../styles/Home.module.css";
import seedData from "../data/meetingData.json";

const STORAGE_KEY = "localMeetingData";

const sortByDateTime = (arr: Meeting[]): Meeting[] =>
  [...arr].sort((a, b) => {
    const d1 = new Date(`${a.meetingDate}T${a.meetingTime}`).getTime();
    const d2 = new Date(`${b.meetingDate}T${b.meetingTime}`).getTime();
    return d1 - d2;
  });

export default function Home() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let loaded: Meeting[] = stored
      ? (JSON.parse(stored) as Meeting[])
      : (seedData.meetings as Meeting[]);

    // Migrate legacy entries that pre-date the id field
    loaded = loaded.map((m) =>
      m.id ? m : { ...m, id: crypto.randomUUID() }
    );

    setMeetings(sortByDateTime(loaded));
  }, []);

  const addMeeting = (meeting: Meeting) => {
    setMeetings((prev) => {
      const updated = sortByDateTime([meeting, ...prev]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMeeting = (id: string) => {
    setMeetings((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Meeting Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Tracking our virtual meetings!</h1>
        <div className={styles.meetings}>
          <MeetingForm addMeeting={addMeeting} />
          <MeetingList meetings={meetings} deleteMeeting={deleteMeeting} />
        </div>
      </main>
    </div>
  );
}
