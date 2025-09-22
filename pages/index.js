import React, { useState } from "react";
import Head from 'next/head';
import meetingData from './meetingData.json';
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

export default class Home extends React.Component {

  state = {
    meetings: [],
  }

  componentDidMount() {
    const localMeetingData = localStorage.getItem('localMeetingData');

    // If no meetings are in storage, grab meetings from meetingData.json
    const loadedMeetings = localMeetingData ? JSON.parse(localMeetingData) : meetingData.meetings;

    const combined = [...loadedMeetings, ...this.state.meetings];
    const preppedMeetings = prepAndSortMeetings(combined)
    this.setState({ meetings: preppedMeetings });
  }

  addMeeting = (meeting) => {
    const preppedMeetings = prepAndSortMeetings([meeting, ...this.state.meetings])

    localStorage.setItem('localMeetingData', JSON.stringify(preppedMeetings));
    this.setState({ meetings: preppedMeetings });
  }

  render() {

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
            <MeetingForm addMeeting={this.addMeeting} />
            <div style={{ marginLeft: 'auto' }}><MeetingsList meetings={this.state.meetings} /></div>

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
    )
  }
}