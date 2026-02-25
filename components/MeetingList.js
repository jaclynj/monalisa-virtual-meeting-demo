import { memo } from "react";
import MonalisaMessage from './MonalisaMessage';

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime }) =>
  `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`;

function Meeting(props) {
  return (
    <tr align="left" style={{ padding: "0 4px" }}>
      <td>{getMeetingInfo(props)}</td>
      <td><a href={props.meetingUrl}>Meeting Link</a></td>
    </tr>
  );
}

export const MeetingsList = memo(function MeetingsList({ meetings }) {
  return (
    <div style={{ padding: '16px' }}>
      <MonalisaMessage messageData={meetings[0]} />
      <table>
        <thead></thead>
        <tbody>
          {meetings.map((data, index) => (
            <Meeting key={index} {...data} />
          ))}
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
