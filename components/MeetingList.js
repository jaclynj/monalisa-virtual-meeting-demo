import React from "react";
import MonalisaMessage from './MonalisaMessage';

// Import utility functions
const { getMeetingInfo } = require('../utils/meetingUtils');

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
  const meetingsList = meetings.map((data, index) => <Meeting key={index} {...data} />)
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

export default MeetingsList;