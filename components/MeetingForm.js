import React, { useState } from "react";

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const formatTime = (date) => {
  const d = new Date(date)
  let hours = d.getHours();
  let minutes = d.getMinutes();
  if (minutes.toString().length < 2)
    minutes = '0' + minutes
  if (hours.toString().length < 2)
    hours = '0' + hours
  return `${hours}:${minutes}`
}

export const MeetingForm = ({ addMeeting }) => {
  const [formData, setFormData] = useState({
    who: 'Devin',
    meetingTitle: '',
    meetingDate: formatDate(Date.now()),
    meetingTime: formatTime(Date.now()),
    meetingUrl: ''
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    addMeeting(formData);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <label>
        Meeting Title:
          <input
          name="meetingTitle"
          type="text"
          value={formData.meetingTitle}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Who:
          <select name="who" value={formData.who} onChange={handleInputChange}>
          <option value="Devin">Devin</option>
          <option value="Allison">Allison</option>
        </select>
      </label>
      <br />
      <label>
        Meeting date:
          <input
          name="meetingDate"
          type="date"
          value={formData.meetingDate}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Meeting time:
          <input
          name="meetingTime"
          type="time"
          value={formData.meetingTime}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Meeting url:
          <input
          name="meetingUrl"
          type="text"
          value={formData.meetingUrl}
          onChange={handleInputChange} />
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