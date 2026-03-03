import React from "react";
import MonalisaMessage from './MonalisaMessage';

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime }) => (
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

export const MeetingsList = React.memo(({ meetings }) => {
  if (!meetings || meetings.length === 0) {
    return <div style={{ padding: '16px' }}>No upcoming meetings.</div>;
  }

  const meetingsList = meetings.map((data) => (
    <Meeting key={`${data.meetingDate}-${data.meetingTime}-${data.who}`} {...data} />
  ))
  return (
    <div style={{ padding: '16px' }}>
      <MonalisaMessage messageData={meetings[0]} />
      <table>
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

export default MeetingsList;
