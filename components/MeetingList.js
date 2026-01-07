import React from "react";
import PropTypes from "prop-types";
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

Meeting.propTypes = {
  who: PropTypes.string.isRequired,
  meetingTitle: PropTypes.string.isRequired,
  meetingDate: PropTypes.string.isRequired,
  meetingTime: PropTypes.string.isRequired,
  meetingUrl: PropTypes.string.isRequired,
};

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

MeetingsList.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.shape({
    who: PropTypes.string.isRequired,
    meetingTitle: PropTypes.string.isRequired,
    meetingDate: PropTypes.string.isRequired,
    meetingTime: PropTypes.string.isRequired,
    meetingUrl: PropTypes.string.isRequired,
  })).isRequired,
};

MeetingsList.displayName = 'MeetingsList';