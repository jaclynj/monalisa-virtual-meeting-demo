import React, { memo, useState } from "react";
import { Meeting } from "../types/meeting";
import MonalisaMessage from "./MonalisaMessage";
import styles from "./MeetingList.module.css";

interface Props {
  meetings: Meeting[];
  deleteMeeting: (id: string) => void;
}

const isFuture = (m: Meeting): boolean =>
  new Date(`${m.meetingDate}T${m.meetingTime}`) > new Date();

const getMeetingLabel = ({
  who,
  meetingTitle,
  meetingDate,
  meetingTime,
}: Meeting): string =>
  `${who} has a meeting called ${meetingTitle} on ${meetingDate} at ${meetingTime}`;

export const MeetingList = memo(function MeetingList({
  meetings,
  deleteMeeting,
}: Props) {
  const [showPast, setShowPast] = useState(false);

  const upcomingMeetings = meetings.filter(isFuture);
  const pastMeetings = meetings.filter((m) => !isFuture(m));
  const displayed = showPast ? meetings : upcomingMeetings;
  const nextMeeting = upcomingMeetings[0];

  return (
    <div className={styles.container}>
      <MonalisaMessage messageData={nextMeeting} />
      {displayed.length === 0 ? (
        <p className={styles.empty}>
          {meetings.length === 0
            ? "No meetings yet. Add one!"
            : "No upcoming meetings. Toggle below to see past meetings."}
        </p>
      ) : (
        <table className={styles.table}>
        <tbody>
            {displayed.map((m) => (
              <tr key={m.id} className={styles.row}>
                <td>{getMeetingLabel(m)}</td>
                <td>
                  {m.meetingUrl && <a href={m.meetingUrl}>Meeting Link</a>}
                </td>
                <td>
                  <button
                    onClick={() => deleteMeeting(m.id)}
                    className={styles.deleteBtn}
                    aria-label={`Delete ${m.meetingTitle}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pastMeetings.length > 0 && (
        <button
          className={styles.toggleBtn}
          onClick={() => setShowPast((p) => !p)}
        >
          {showPast
            ? "Hide past meetings"
            : `Show ${pastMeetings.length} past meeting(s)`}
        </button>
      )}
    </div>
  );
});

export default MeetingList;
