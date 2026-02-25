import React from "react";
import Head from "next/head";
import { MeetingForm } from "./MeetingForm";
import { MeetingsList } from "./MeetingList";

function isFutureMeeting(m) {
  return new Date(m.meetingDate + "T" + m.meetingTime).getTime() > Date.now();
}

async function fetchUpcomingMeetings() {
  const resp = await fetch("/api/meetings");
  const all = await resp.json();
  return all.filter(isFutureMeeting);
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meetings: [] };
    this.addMeeting = this.addMeeting.bind(this);
  }

  componentDidMount() {
    fetchUpcomingMeetings().then((meetings) => this.setState({ meetings }));
  }

  addMeeting(newMeeting) {
    fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMeeting),
    })
      .then((r) => r.json())
      .then(() => fetchUpcomingMeetings())
      .then((meetings) => this.setState({ meetings }));
  }

  render() {
    const { meetings } = this.state;
    return (
      <div className="container">
        <Head>
          <title>Zoom Meeting Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Tracking our virtual meetings!</h1>
          <div className="meetings">
            <MeetingForm addMeeting={this.addMeeting} />
            <div style={{ marginLeft: "auto" }}>
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
}
