import React from "react";
import MonalisaMessage from './MonalisaMessage';

const Meeting = ({ who, meetingTitle, meetingDate, meetingTime, description }) => {
  return (
    <div className="box">
      <p className="datetime">{meetingDate} at {meetingTime}</p>
      <p className="meeting-title">{meetingTitle}</p>
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