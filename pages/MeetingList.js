import React from "react";
import MonalisaMessage from './MonalisaMessage';

const getMeetingInfo = ({ who, meetingTitle, meetingDate, meetingTime, meetingUrl }) =>
  (<>
    {who} has a meeting called {meetingTitle} coming up on {meetingDate} at {meetingTime}  <a href={meetingUrl}>Meeting Link</a>
  </>)

const Meeting = (props) => {
  const meetingInfo = getMeetingInfo(props);
  return (<tr><td>{meetingInfo}</td></tr>)
}

export const MeetingsList = React.memo(({ meetings }) => {
  const meetingsList = meetings.map((data, index) => <Meeting key={index} {...data} />)
  return (
    <div>
      <MonalisaMessage messageData={meetings[0]} />
      <table>
        <thead></thead>
        <tbody>{meetingsList}</tbody>
      </table>
      <style jsx>{`
          table {
            display: inline-grid;
          }
          `}
      </style>
    </div>

  )
})