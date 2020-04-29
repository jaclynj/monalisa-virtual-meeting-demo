import React from "react";
import MonalisaMessage from './MonalisaMessage';

const Meeting = ({ who, meetingTitle, meetingDate, meetingTime, description }) => {
  return (
    <>
      <div className="box">
        <p className="datetime">{meetingDate} at {meetingTime}</p>
        <p className="meeting-title">{meetingTitle}</p>
        <p className="attendees">{who}</p>
        <p className="description">{description}</p>
        <button>Open video chat</button>
      </div>
      <style jsx>{`
        .box {
          background: white;
          border-radius: 6px; 
          padding: 20px;
          margin-bottom: 10px;
        }
          `}
      </style>
    </>
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
      <style jsx>{`
        .meeting-list {
          grid-row: 2;
          grid-column: 1;
        }
          `}
      </style>
    </>
  )
})