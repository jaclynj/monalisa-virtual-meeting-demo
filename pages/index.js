import { useState, useEffect, startTransition } from "react";
import Head from 'next/head';
import meetingData from './meetingData.json';
import { MeetingForm } from '../components/MeetingForm';
import { MeetingsList } from '../components/MeetingList';

const byChronOrder = (a, b) =>
  new Date(`${a.meetingDate}T${a.meetingTime}`) - new Date(`${b.meetingDate}T${b.meetingTime}`);

const isUpcoming = (m) => new Date(`${m.meetingDate}T${m.meetingTime}`) > Date.now();

const upcomingSorted = (meetings) => meetings.filter(isUpcoming).sort(byChronOrder);

export default function Home() {
  const [meetings, setMeetings] = useState([]);

  // Load meetings from localStorage once on mount (localStorage is browser-only, so useEffect is required)
  useEffect(() => {
    const stored = localStorage.getItem('localMeetingData');
    startTransition(() => {
      setMeetings(upcomingSorted(stored ? JSON.parse(stored) : meetingData.meetings));
    });
  }, []);

  function addMeeting(meeting) {
    const updated = upcomingSorted([meeting, ...meetings]);
    localStorage.setItem('localMeetingData', JSON.stringify(updated));
    setMeetings(updated);
  }

  return (
    <div className="container">
      <Head>
        <title>Zoom Meeting Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Tracking our virtual meetings!</h1>
        <div className="meetings">
          <MeetingForm addMeeting={addMeeting} />
          <div style={{ marginLeft: 'auto' }}>
            <MeetingsList meetings={meetings} />
          </div>
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
        html, body {
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
