import React from "react";
import MonalisaMessage from './MonalisaMessage';

function describeMeeting({ who, meetingTitle, meetingDate, meetingTime }) {
  return `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`;
}

function MeetingRow(props) {
  return (
    <tr align="left" style={{ padding: "0 4px" }}>
      <td>{describeMeeting(props)}</td>
      <td><a href={props.meetingUrl}>Meeting Link</a></td>
    </tr>
  );
}

export const MeetingsList = React.memo(function MeetingsList({ meetings }) {
  return (
    <div style={{ padding: '16px' }}>
      <MonalisaMessage messageData={meetings[0]} />
      <table>
        <thead></thead>
        <tbody>
          {meetings.map((item) => <MeetingRow key={`${item.who}-${item.meetingDate}-${item.meetingTime}`} {...item} />)}
        </tbody>
      </table>
      <style jsx>{`
        table {
          padding-top: 8px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
});
