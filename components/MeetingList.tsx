import React from 'react';
import { Meeting } from '../types/meeting';
import MonalisaMessage from './MonalisaMessage';
import styles from '../styles/MeetingList.module.css';

const getMeetingInfo = ({
  who,
  meetingTitle,
  meetingDate,
  meetingTime,
}: Meeting): string =>
  `${who} has a meeting called ${meetingTitle} coming up on ${meetingDate} at ${meetingTime}`;

const MeetingRow: React.FC<Meeting> = (props) => {
  const meetingInfo = getMeetingInfo(props);
  return (
    <tr>
      <td className={styles.cell}>{meetingInfo}</td>
      <td className={styles.cell}>
        <a href={props.meetingUrl}>Meeting Link</a>
      </td>
    </tr>
  );
};

interface MeetingsListProps {
  meetings: Meeting[];
}

const MeetingsList: React.FC<MeetingsListProps> = React.memo(({ meetings }) => {
  const meetingsList = meetings.map((data) => (
    <MeetingRow
      key={`${data.who}-${data.meetingDate}-${data.meetingTime}`}
      {...data}
    />
  ));
  return (
    <div className={styles.wrapper}>
      {meetings.length > 0 && <MonalisaMessage messageData={meetings[0]} />}
      <table className={styles.table}>
        <tbody>{meetingsList}</tbody>
      </table>
    </div>
  );
});

MeetingsList.displayName = 'MeetingsList';

export default MeetingsList;
