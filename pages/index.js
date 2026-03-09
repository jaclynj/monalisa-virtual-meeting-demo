import React, { useState, useEffect } from "react";
import Head from 'next/head';
import meetingData from '../data/meetingData.json';
import { MeetingForm } from '../components/MeetingForm';
import { MeetingsList } from '../components/MeetingList';

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
}

export default function Home() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('localMeetingData');
    // If no meetings are in storage, grab meetings from meetingData.json
    const base = stored ? JSON.parse(stored) : meetingData.meetings;
    setMeetings(prepAndSortMeetings(base));
  }, []);

  const addMeeting = (newMeeting) => {
    setMeetings((current) => {
      const sorted = prepAndSortMeetings([newMeeting, ...current]);
      localStorage.setItem('localMeetingData', JSON.stringify(sorted));
      return sorted;
    });
  };

  return (
      <div className="container">
        <Head>
          <title>Zoom Meeting Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Tracking our virtual meetings!
          </h1>
          <div className="meetings">
            <MeetingForm addMeeting={addMeeting} />
            <div style={{ marginLeft: 'auto' }}><MeetingsList meetings={meetings} /></div>

          </div>
        </main>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .meetings {
            display: flex;
          }
          main {
            width: 100%;
            max-width: 1000px;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            background-color: aliceblue;
            color: darkblue;
            font-weight: bold;
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
  );
}