import React, { useState } from "react";

function toDateString(ts) {
  const d = new Date(ts);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function toTimeString(ts) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${min}`;
}

const INITIAL_STATE = () => ({
  who: 'Devin',
  meetingTitle: '',
  meetingDate: toDateString(Date.now()),
  meetingTime: toTimeString(Date.now()),
  meetingUrl: '',
});

export function MeetingForm({ addMeeting }) {
  const [form, setForm] = useState(INITIAL_STATE);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    addMeeting(form);
  }

  return (
    <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
      <label>
        Meeting Title:
        <input name="meetingTitle" type="text" value={form.meetingTitle} onChange={onChange} />
      </label>
      <br />
      <label>
        Who:
        <select name="who" value={form.who} onChange={onChange}>
          <option value="Devin">Devin</option>
          <option value="Allison">Allison</option>
        </select>
      </label>
      <br />
      <label>
        Meeting date:
        <input name="meetingDate" type="date" value={form.meetingDate} onChange={onChange} />
      </label>
      <br />
      <label>
        Meeting time:
        <input name="meetingTime" type="time" value={form.meetingTime} onChange={onChange} />
      </label>
      <br />
      <label>
        Meeting url:
        <input name="meetingUrl" type="text" value={form.meetingUrl} onChange={onChange} />
      </label>
      <br />
      <input type="submit" value="Submit" />
      <style jsx>{`
        label { display: block; }
      `}</style>
    </form>
  );
}

export default MeetingForm;
