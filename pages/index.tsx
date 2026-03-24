import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Meeting } from '../types/meeting';
import { prepAndSortMeetings } from '../lib/meetings';
import meetingData from '../data/meetingData.json';
import MeetingForm from '../components/MeetingForm';
import MeetingsList from '../components/MeetingList';
import styles from '../styles/Home.module.css';

const STORAGE_KEY = 'localMeetingData';

const Home: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const loaded: Meeting[] = stored
      ? (JSON.parse(stored) as Meeting[])
      : (meetingData.meetings as Meeting[]);
    setMeetings(prepAndSortMeetings(loaded));
  }, []);

  const addMeeting = (meeting: Meeting) => {
    setMeetings((prev) => {
      const updated = prepAndSortMeetings([meeting, ...prev]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Zoom Meeting Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Tracking our virtual meetings!</h1>
        <div className={styles.meetings}>
          <MeetingForm addMeeting={addMeeting} />
          <div className={styles.meetingsList}>
            <MeetingsList meetings={meetings} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
