import React from "react";
import MonalisaMessage from './MonalisaMessage';

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime, meetingUrl }) => (
  `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`
);

const Meeting = (props) => {
  const meetingInfo = getMeetingInfo(props);
  return (
    <tr align="left" style={{ padding: "0 4px" }}>
      <td>{meetingInfo}</td>
      <td><a href={props.meetingUrl}>Meeting Link</a></td>
    </tr>
  )
}

export const MeetingsList = React.memo(function MeetingsList({ meetings }) {
  const meetingsList = meetings.map((data) => <Meeting key={`${data.who}-${data.meetingDate}-${data.meetingTime}`} {...data} />)
  return (
    <div style={{ padding: '16px' }}>
      <MonalisaMessage messageData={meetings[0]} />
      <table>
        <thead></thead>
        <tbody>{meetingsList}</tbody>
      </table>
      <style jsx>{`
          table {
            padding-top: 8px;
            margin: 0 auto;
          }
          `}
      </style>
    </div>

  )
})