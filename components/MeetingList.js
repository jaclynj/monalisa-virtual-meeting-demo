import React from "react";
import MonalisaMessage from './MonalisaMessage';
import { format } from 'timeago.js';

const Meeting = ({ who, meetingTitle, meetingDate, meetingTime, description }) => {
  const dateTime = Date.parse(meetingDate + " " + meetingTime)
  const soon = dateTime - Date.now() < 3600000 ? "soon" : ""
  return (
    <div className="box">
      <p className="meeting-title">{meetingTitle}
      <span className={"datetime " + soon}>{format(dateTime)}</span></p>
      <p className="attendees">{who}</p>
      <p className="description">{description}</p>
      <button>Open video call</button>
    </div>
  )
}

export const MeetingsList = React.memo(({ meetings }) => {
  const meetingsList = meetings.map((data, index) => <Meeting key={index} {...data} />)
  return (
    <>
      <MonalisaMessage messageData={meetings[0]} />
      <div className="meeting-list">
        <h2>Upcoming meetings</h2>
        {meetingsList}
      </div>
    </>
  )
})