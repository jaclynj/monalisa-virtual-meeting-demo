import React, { useState } from "react";

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function MeetingForm({ addMeeting }) {
  const [form, setForm] = useState({
    who: "",
    meetingTitle: "",
    meetingDate: formatDate(Date.now()),
    meetingTime: formatTime(Date.now()),
    meetingUrl: "",
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMeeting(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <label>
        Meeting Title:
        <input
          name="meetingTitle"
          type="text"
          value={form.meetingTitle}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Who:
        <input
          name="who"
          type="text"
          value={form.who}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Meeting date:
        <input
          name="meetingDate"
          type="date"
          value={form.meetingDate}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Meeting time:
        <input
          name="meetingTime"
          type="time"
          value={form.meetingTime}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Meeting url:
        <input
          name="meetingUrl"
          type="url"
          value={form.meetingUrl}
          onChange={handleInputChange}
        />
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
