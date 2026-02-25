import { useState } from "react";

const toDateStr = (ts) => {
  const d = new Date(ts);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

const toTimeStr = (ts) => {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const buildInitialFields = () => {
  const now = Date.now();
  return {
    who: 'Devin',
    meetingTitle: '',
    meetingDate: toDateStr(now),
    meetingTime: toTimeStr(now),
    meetingUrl: '',
  };
};

export function MeetingForm({ addMeeting }) {
  const [fields, setFields] = useState(buildInitialFields);

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addMeeting(fields);
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <label htmlFor="meetingTitle">
        Meeting Title:
        <input id="meetingTitle" name="meetingTitle" type="text" value={fields.meetingTitle} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="who">
        Who:
        <select id="who" name="who" value={fields.who} onChange={handleChange}>
          <option value="Devin">Devin</option>
          <option value="Allison">Allison</option>
        </select>
      </label>
      <br />
      <label htmlFor="meetingDate">
        Meeting date:
        <input id="meetingDate" name="meetingDate" type="date" value={fields.meetingDate} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="meetingTime">
        Meeting time:
        <input id="meetingTime" name="meetingTime" type="time" value={fields.meetingTime} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor="meetingUrl">
        Meeting url:
        <input id="meetingUrl" name="meetingUrl" type="text" value={fields.meetingUrl} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Submit" />
      <style jsx>{`
        label {
          display: block;
        }
      `}</style>
    </form>
  );
}

export default MeetingForm;
