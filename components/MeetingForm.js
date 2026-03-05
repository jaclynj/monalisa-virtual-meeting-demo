import React, { useState } from "react";

const padTwo = (n) => n.toString().padStart(2, "0");

const fmtDate = (ts) => {
  const d = new Date(ts);
  return [d.getFullYear(), padTwo(d.getMonth() + 1), padTwo(d.getDate())].join("-");
};

const fmtTime = (ts) => {
  const d = new Date(ts);
  return `${padTwo(d.getHours())}:${padTwo(d.getMinutes())}`;
};

const DEFAULT_STATE = () => ({
  who: "Devin",
  meetingTitle: "",
  meetingDate: fmtDate(Date.now()),
  meetingTime: fmtTime(Date.now()),
  meetingUrl: "",
});

export function MeetingForm({ addMeeting }) {
  const [formData, setFormData] = useState(DEFAULT_STATE);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addMeeting(formData);
  };

  return (
    <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
      <label>
        Meeting Title:
        <input name="meetingTitle" type="text" value={formData.meetingTitle} onChange={onChange} />
      </label>
      <br />
      <label>
        Who:
        <select name="who" value={formData.who} onChange={onChange}>
          <option value="Devin">Devin</option>
          <option value="Allison">Allison</option>
        </select>
      </label>
      <br />
      <label>
        Meeting date:
        <input name="meetingDate" type="date" value={formData.meetingDate} onChange={onChange} />
      </label>
      <br />
      <label>
        Meeting time:
        <input name="meetingTime" type="time" value={formData.meetingTime} onChange={onChange} />
      </label>
      <br />
      <label>
        Meeting url:
        <input name="meetingUrl" type="text" value={formData.meetingUrl} onChange={onChange} />
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
