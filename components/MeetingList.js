import React from "react";
import MonalisaMessage from "./MonalisaMessage";

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime }) =>
  `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`;

const Meeting = (props) => {
  const meetingInfo = getMeetingInfo(props);
  return (
    <tr align="left" style={{ padding: "0 4px" }}>
      <td>{meetingInfo}</td>
      <td>
        <a href={props.meetingUrl}>Meeting Link</a>
      </td>
    </tr>
  );
};

function MeetingsListInner({ meetings }) {
  const meetingsList = meetings.map((data) => (
    <Meeting
      key={`${data.who}-${data.meetingTitle}-${data.meetingDate}-${data.meetingTime}`}
      {...data}
    />
  ));
  return (
    <div style={{ padding: "16px" }}>
      <MonalisaMessage messageData={meetings[0] ?? null} />
      <table>
        <thead></thead>
        <tbody>{meetingsList}</tbody>
      </table>
      <style jsx>{`
        table {
          padding-top: 8px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export const MeetingsList = React.memo(MeetingsListInner);
